import { Request, Response, NextFunction} from 'express';
import { AuthenticationModel } from '../models/AuthenticationModel';

export const insertAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { badge, passage } = req.body;
        const authentication = await AuthenticationModel.create({ badge, passage });
        res.status(201).json(authentication);
    } catch (error) {
        next(error);
    }
};

export const deleteAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { badge, passage } = req.params;
        const authentication = await AuthenticationModel.findOne({ where: { badge, passage }});
        if(!authentication) {
            return res.status(404).json({message: 'Authentication record not found'});
        }
        await authentication.destroy();
        res.status(200).json({message: 'Authentication record deleted'});
    } catch (error) {
        next(error);
    }
};

