import { Request, Response, NextFunction } from 'express';
import { PassagesModel } from '../models/PassagesModel';

export const getAllPassages = async(req: Request, res: Response) => {
    const passages = await PassagesModel.findAll();
    res.json(passages);
};

export const createPassage = async (req: Request, res: Response) => {
    const { passageId, level, isSuspended } = req.body;
    const passage = await PassagesModel.create({passageId, level, isSuspended});
    res.json(passage);
};

export const getPassage = async (req: Request, res: Response) => {
    const {passageId} = req.params;
    const passage = await PassagesModel.findByPk(passageId);
    if (passage) {
        res.json(passage);
    } else {
        res.status(404).json({error: 'Passage not found'});
    }
};

export const updatePassage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {passage_id, level, is_suspended} = req.body;
    const passage = await PassagesModel.findByPk(id);
    if (passage) {
        passage.set({
            passageId: passage_id,
            level: level,
            isSuspended: is_suspended
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