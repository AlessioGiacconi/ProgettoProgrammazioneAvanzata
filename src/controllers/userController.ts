/**
 * @file userController.ts
 * @description Questo file contiene i controller per la gestione degli utenti.
 */

import { Request, Response, NextFunction } from 'express';
import { UsersModel } from '../models/UsersModel';
import jwt from 'jsonwebtoken';
import { ErrorEnum, SuccessEnum } from '../factory/Message';
import { ErrorFactory } from '../factory/Errors';
import { SuccessFactory} from '../factory/Successes';

const PK = process.env.PK || 'default_secret_key';

/**
 * @function getAllUsers
 * @description Recupera tutti gli utenti dal database.
 * @param {Request} req - La richiesta HTTP.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UsersModel.findAll();
    const response = new SuccessFactory().getMessage(SuccessEnum.UserRetrievedSuccess).getResponse();
    res.status(response.status).json({ ...response, data: users });
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

/**
 * @function registerUser
 * @description Registra un nuovo utente nel database.
 * @param {Request} req - La richiesta HTTP, che contiene i dati dell'utente nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UsersModel.create({
      email: req.body.email,
      passwd: req.body.passwd,
      role: req.body.role,
      is_suspended: false,
      tokens: 100,
      passage_reference: req.body.role === 'passage' ? req.body.passage_reference : null
    });
    const response = new SuccessFactory().getMessage(SuccessEnum.UserRegisteredSuccess).getResponse();
    res.status(response.status).json({ ...response, data: user });
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.UserRegistrationFailed).getResponse());
  }
};

/**
 * @function loginUser
 * @description Effettua il login di un utente generando un token JWT.
 * @param {Request} req - La richiesta HTTP, che contiene l'email e la password nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 */
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
    const response = new SuccessFactory().getMessage(SuccessEnum.LoginSuccess).getResponse();
    res.status(response.status).json({ ...response, jwt: jwtBearerToken });
  } catch (error) {
    const response = new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse();
    console.error('Error signing JWT:', error);
    res.status(response.status).json(response);
  }
};

/**
 * @function getUser
 * @description Recupera un utente specifico dal database.
 * @param {Request} req - La richiesta HTTP, che contiene l'ID dell'utente nei parametri della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findByPk(id);
    if (user) {
        const response = new SuccessFactory().getMessage(SuccessEnum.UserRetrievedSuccess).getResponse();
        res.status(response.status).json({ ...response, data: user });
    } else {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      res.status(response.status).json(response);
    }
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

/**
 * @function updateUser
 * @description Aggiorna i dati di un utente specifico nel database.
 * @param {Request} req - La richiesta HTTP, che contiene l'ID dell'utente nei parametri della richiesta e i dati da aggiornare nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, passwd, tokens, passage_reference } = req.body;
    const user = await UsersModel.findByPk(id);
    if (user) {
      const updateData: any = {};
      if (email !== undefined) updateData.email = email;
      if(passwd !== undefined) updateData.passwd = passwd;
      if(tokens !== undefined) updateData.tokens = tokens;
      if(passage_reference !== undefined) updateData.passage_reference = passage_reference;

      user.set(updateData);
      await user.save();
      const response = new SuccessFactory().getMessage(SuccessEnum.UserUpdatedSuccess).getResponse();
      res.status(response.status).json({ ...response, data: user });
    } else {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      res.status(response.status).json(response);
    }
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

/**
 * @function deleteUser
 * @description Elimina un utente specifico dal database.
 * @param {Request} req - La richiesta HTTP, che contiene l'ID dell'utente nei parametri della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findByPk(id);
    if (user) {
      await user.destroy();
      const response = new SuccessFactory().getMessage(SuccessEnum.UserDeletedSuccess).getResponse();
      res.status(response.status).json(response);
    } else {
      const response = new ErrorFactory().getMessage(ErrorEnum.UserNotFound).getResponse();
      res.status(response.status).json(response);
    }
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

/**
 * @function getSuspendedBadges
 * @description Recupera tutti i badge sospesi dal database.
 * @param {Request} req - La richiesta HTTP.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
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
    const response = new SuccessFactory().getMessage(SuccessEnum.UsersSuspendedSuccess).getResponse();
    res.status(response.status).json({ ...response, data: suspendedBadges });
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};

/**
 * @function reactivateBadges
 * @description Riattiva i badge sospesi specificati nel database.
 * @param {Request} req - La richiesta HTTP, che contiene gli ID dei badge nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
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
    const response = new SuccessFactory().getMessage(SuccessEnum.UserActivatedSuccess).getResponse();
    res.status(response.status).json({ ...response, updatedCount: updatedUsers[0], data: reactivatedUsers });
  } catch (error) {
    next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
  }
};