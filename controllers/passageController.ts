import { Request, Response, NextFunction } from 'express';
import { PassagesModel } from '../models/PassagesModel';

export const getAllPassages = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const passages = await PassagesModel.findAll();
        res.json(passages);
    } catch (error) {
        next(error);
    }
};

export const createPassage = async (req: Request, res: Response) => {
    const { passage_id, level, is_suspended } = req.body;
    const passage = await PassagesModel.create({passage_id, level, is_suspended});
    res.json(passage);
};

export const getPassage = async (req: Request, res: Response) => {
    const {passage_id} = req.params;
    const passage = await PassagesModel.findByPk(passage_id);
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
            passage_id: passage_id,
            level: level,
            is_suspended: is_suspended
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