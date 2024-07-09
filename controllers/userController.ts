import {Request, Response, NextFunction} from 'express';
import { UsersModel } from '../models/UsersModel';

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await UsersModel.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, passwd, is_admin, auth_level, is_suspended, tokens} = req.body;
        const user = await UsersModel.create({ email, passwd, is_admin, auth_level, is_suspended, tokens});
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UsersModel.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        } 
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { email, passwd, is_admin, auth_level, is_suspended, tokens} = req.body;
        const user = await UsersModel.findByPk(id);
        if (user) {
            user.set({
                email: email,
                passwd: passwd,
                is_admin: is_admin,
                auth_level: auth_level,
                is_suspended: is_suspended,
                tokens: tokens
            })
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UsersModel.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({message: 'User deleted'});
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        next(error);
    }
};