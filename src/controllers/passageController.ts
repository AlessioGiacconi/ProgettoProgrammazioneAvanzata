import { Request, Response, NextFunction } from 'express';
import { PassagesModel } from '../models/PassagesModel';
import { ErrorEnum, SuccessEnum } from '../factory/Message';
import { ErrorFactory } from '../factory/Errors';
import { SuccessFactory} from '../factory/Successes';

export const getAllPassages = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const passages = await PassagesModel.findAll();
        const response = new SuccessFactory().getMessage(SuccessEnum.PassageRetrievedSuccess).getResponse();
        res.status(response.status).json({ ...response, data: passages });
    } catch (error) {
        next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
    }
};

export const createPassage = async (req: Request, res: Response) => {
    const { level, needs_dpi } = req.body;
    const passage = await PassagesModel.create({ level, needs_dpi});
    const response = new SuccessFactory().getMessage(SuccessEnum.PassageCreatedSuccess).getResponse();
};

export const getPassage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const passage = await PassagesModel.findByPk(id);
    if (passage) {
        res.json(passage);
    } else {
        res.status(404).json({error: 'Passage not found'});
    }
};

export const updatePassage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {level, needs_dpi} = req.body;
    const passage = await PassagesModel.findByPk(id);
    if (passage) {
        passage.set({
            level: level,
            is_suspended: needs_dpi
        });
        await passage.save();
        res.json(passage);
    } else {
        res.status(404).json({ error: 'Passage not found'})
    }
}

export const deletePassage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const passage = await PassagesModel.findByPk(id);
    if (passage) {
        await passage.destroy();
        res.json({message: 'Passage deleted'});
    } else {
        res.status(404).json({error: 'Passage not found'})
    }
}