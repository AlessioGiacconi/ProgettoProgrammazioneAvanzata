import {Request, Response, NextFunction} from 'express';
import { UsersModel } from '../models/UsersModel';
var jwt = require('jsonwebtoken');


const PK = process.env.PK;

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await UsersModel.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UsersModel.create({ 
            email: req.body.email,
            passwd: req.body.passwd,
            role: req.body.role,
            auth_level: 1,
            is_suspended: false,
            tokens: 100
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const email = req.query.email;
    const passwd = req.query.passwd;
    if(!email || !passwd){
        return res.status(400).json({message: 'Email and password are required'});
    };
    const payload = {
        email: email,
    };
    try {
        const jwtBearerToken =jwt.sign(payload, PK, { expiresIn: '1h'});
        res.json({jwt: jwtBearerToken});
    } catch (error) {
        console.error('Error signing JWT:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

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
        const { email, passwd, role, auth_level, is_suspended, tokens} = req.body;
        const user = await UsersModel.findByPk(id);
        if (user) {
            user.set({
                email: email,
                passwd: passwd,
                role: role,
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