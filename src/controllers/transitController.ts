import { Request, Response, NextFunction } from 'express';
import { TransitsModel } from '../models/TransitsModel';
import logger from '../log/logger';
import { UsersModel } from '../models/UsersModel';
import { AuthorizationModel } from '../models/AuthorizationModel';

export const getAllTransit = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const transits = await TransitsModel.findAll();
        res.json(transits);
    } catch (error) {
        next(error);
    }
};

export const getTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        res.json(transit);
    } else {
        res.status(404).json({error: 'Transit not found'});
    }
};

export const createTransit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { passage, badge, transit_date, violation_dpi } = req.body;

        const user = await UsersModel.findByPk(badge);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.get('role') === 'passage' && user.get('passage_reference') !== passage) {
            return res.status(403).json({ message: 'User with role "passage" can only insert transits for thei reference passage' })
        }

        const authorization = await AuthorizationModel.findOne({
            where: {
                badge: badge,
                passage: passage
            }
        });

        const is_authorized = !!authorization;

        const transit = await TransitsModel.create({
            passage: passage,
            badge: badge,
            transit_date: transit_date,
            is_authorized: is_authorized,
            violation_dpi: violation_dpi
        });

        logger.info(`Transit created: Badge ${badge}, Status: ${is_authorized ? 'authorized' : 'unauthorized'}`);

        res.status(201).json(transit);
    } catch (error) {
        next(error);
    }
}

export const updateTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {transit_date, violation_dpi} = req.body;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        transit.set({
            transit_date: transit_date,
            violation_dpi: violation_dpi
        });
        await transit.save();
        res.json(transit);
    } else {
        res.status(404).json({ error: 'Transit not found'})
    }
}

export const deleteTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        await transit.destroy();
        res.json({message: 'Transit deleted'});
    } else {
        res.status(404).json({error: 'Transit not found'})
    }
}