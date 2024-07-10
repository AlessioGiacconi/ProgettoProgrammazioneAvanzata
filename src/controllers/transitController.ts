import { Request, Response, NextFunction } from 'express';
import { TransitsModel } from '../models/TransitsModel';

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

export const updateTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {passage, badge, transit_date, is_authorized, violation_dpi} = req.body;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        transit.set({
            passage: passage,
            badge: badge,
            transit_date: transit_date,
            is_authorized: is_authorized,
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