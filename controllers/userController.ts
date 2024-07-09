import {Request, Response, NextFunction} from 'express';
import { UsersModel } from '../models/UsersModel';

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await UsersModel.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
}