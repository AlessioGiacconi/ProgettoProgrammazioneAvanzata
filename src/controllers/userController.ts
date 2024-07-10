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
            is_suspended: false,
            tokens: 100,
            passage_reference: req.body.passage_reference
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
        email: email
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
        const { email, passwd, tokens, passage_reference} = req.body;
        const user = await UsersModel.findByPk(id);
        if (user) {
            user.set({
                email: email !== undefined ? email: user.get('email'),
                passwd: passwd !== undefined ? passwd: user.get('passwd'),
                tokens: tokens !== undefined ? tokens: user.get('tokens'),
                passage_reference: passage_reference !== undefined ? passage_reference: user.get('passage_reference')
            });
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

export const getSuspendedBadges = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const suspendedUsers = await UsersModel.findAll({
            where : {
                is_suspended: true
            },
            attributes: ['badge_id', 'email']
        });
        const suspendedBadges = suspendedUsers.map(user => ({
            badge_id: user.get('badge_id'),
            email: user.get('email')
        }));
        res.status(200).json(suspendedBadges);
    } catch (error) {
        next(error);
    }
};

export const reactivateBadges = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { badgeIds } = req.body;

        // Trova tutti gli utenti sospesi con i badge specificati
        const suspendedUsers = await UsersModel.findAll({
            where: {
                badge_id: badgeIds,
                is_suspended: true
            },
            attributes: ['badge_id', 'email']  // Specifica le colonne che vuoi selezionare
        });

         // Se non ci sono utenti da riattivare, ritorna un messaggio di errore
        if (suspendedUsers.length == 0) {
            return res.status(404).json({message: 'No suspended badges found to reactivate'});
        }
        
        // Ottieni gli ID dei badge degli utenti sospesi
        const suspendedBadgesIds = suspendedUsers.map(user => user.get('badge_id'));

        // Aggiorna is_suspended a false solo per gli utenti trovati
        const updatedUsers = await UsersModel.update(
            {is_suspended: false},
            {where: { badge_id: suspendedBadgesIds}}
        );

         // Prepara la risposta con badge_id e email degli utenti riattivati
        const reactivatedUsers = suspendedUsers.map(user => ({
            badge_id: user.get('badge_id'),
            email: user.get('email')
        }));

        res.status(200).json({
            message: 'Badges reactivated succesfully', 
            updatedCount: updatedUsers[0],
            reactivatedUsers
        });
    } catch (error) {
        next(error);
    }
};