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
    const { passage_id, level, needs_dpi } = req.body;
    const passage = await PassagesModel.create({passage_id, level, needs_dpi});
    res.json(passage);
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
    const {passage_id, level, needs_dpi} = req.body;
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