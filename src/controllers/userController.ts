import { Request, Response, NextFunction } from 'express';
import { UsersModel } from '../models/UsersModel';
import jwt from 'jsonwebtoken';
import { ErrorEnum, SuccessEnum } from '../factory/Message';
import { ErrorFactory } from '../factory/Errors';

const PK = process.env.PK || 'default_secret_key';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UsersModel.findAll();
    res.json(users);
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UsersModel.create({
      email: req.body.email,
      passwd: req.body.passwd,
      role: req.body.role,
      is_suspended: false,
      tokens: 100,
      passage_reference: req.body.passage_reference
    });
    res.json(user);
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.UserRegistrationFailed).getResponse());
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, passwd } = req.body;
  if (!email || !passwd) {
    const response = new ErrorFactory().getMessage(ErrorEnum.LoginBadRequest).getResponse();
    return res.status(response.status).json(response);
  }

  try {
    const user = await UsersModel.findOne({ where: { email, passwd } });

    if (!user) {
      const response = new ErrorFactory().getMessage(ErrorEnum.LoginFailed).getResponse();
      return res.status(response.status).json(response);
    }

    const payload = {
      badge_id: user.get('badge_id'),
      email: user.get('email'),
      role: user.get('role'),
      is_suspended: user.get('is_suspended')
    };

    const jwtBearerToken = jwt.sign(payload, PK, { expiresIn: '1h' });
    res.json({ jwt: jwtBearerToken });
  } catch (error) {
    const response = new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse();
    console.error('Error signing JWT:', error);
    res.status(response.status).json(response);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      res.status(response.status).json(response);
    }
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, passwd, tokens, passage_reference } = req.body;
    const user = await UsersModel.findByPk(id);
    if (user) {
      user.set({
        email: email !== undefined ? email : user.get('email'),
        passwd: passwd !== undefined ? passwd : user.get('passwd'),
        tokens: tokens !== undefined ? tokens : user.get('tokens'),
        passage_reference: passage_reference !== undefined ? passage_reference : user.get('passage_reference')
      });
      await user.save();
      res.json(user);
    } else {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      res.status(response.status).json(response);
    }
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      res.status(response.status).json(response);
    }
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

export const getSuspendedBadges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const suspendedUsers = await UsersModel.findAll({
      where: {
        is_suspended: true
      },
      attributes: ['badge_id', 'email']
    });
    const suspendedBadges = suspendedUsers.map(user => ({
      badge_id: user.get('badge_id'),
      email: user.get('email')
    }));
    res.json(suspendedBadges);
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

export const reactivateBadges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { badgeIds } = req.body;

    const suspendedUsers = await UsersModel.findAll({
      where: {
        badge_id: badgeIds,
        is_suspended: true
      },
      attributes: ['badge_id', 'email']
    });

    if (suspendedUsers.length === 0) {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      return res.status(response.status).json(response);
    }

    const suspendedBadgesIds = suspendedUsers.map(user => user.get('badge_id'));

    const updatedUsers = await UsersModel.update(
      { is_suspended: false },
      { where: { badge_id: suspendedBadgesIds } }
    );

    const reactivatedUsers = suspendedUsers.map(user => ({
      badge_id: user.get('badge_id'),
      email: user.get('email')
    }));

    res.json({
      updatedCount: updatedUsers[0],
      reactivatedUsers
    });
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};