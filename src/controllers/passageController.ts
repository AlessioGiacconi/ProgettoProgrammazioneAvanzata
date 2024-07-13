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

export const createPassage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { level, needs_dpi } = req.body;
      const passage = await PassagesModel.create({ level, needs_dpi });
      const response = new SuccessFactory().getMessage(SuccessEnum.PassageCreatedSuccess).getResponse();
      res.status(response.status).json({ ...response, data: passage });
    } catch (error) {
      next(new ErrorFactory().getMessage(ErrorEnum.PassageCreationFailed).getResponse());
    }
};

export const getPassage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const passage = await PassagesModel.findByPk(id);
      if (passage) {
        const response = new SuccessFactory().getMessage(SuccessEnum.PassageRetrievedSuccess).getResponse();
        res.status(response.status).json({ ...response, data: passage });
      } else {
        next(new ErrorFactory().getMessage(ErrorEnum.PassageNotFound).getResponse());
      }
    } catch (error) {
      next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
    }
};

  export const updatePassage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { level, needs_dpi } = req.body;
    try {
      const passage = await PassagesModel.findByPk(id);
      if (passage) {
        passage.set({
          level: level,
          needs_dpi: needs_dpi
        });
        await passage.save();
        const response = new SuccessFactory().getMessage(SuccessEnum.PassageUpdatedSuccess).getResponse();
        res.status(response.status).json({ ...response, data: passage });
      } else {
        next(new ErrorFactory().getMessage(ErrorEnum.PassageNotFound).getResponse());
      }
    } catch (error) {
      next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
    }
};

export const deletePassage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const passage = await PassagesModel.findByPk(id);
      if (passage) {
        await passage.destroy();
        const response = new SuccessFactory().getMessage(SuccessEnum.PassageDeletedSuccess).getResponse();
        res.status(response.status).json(response);
      } else {
        next(new ErrorFactory().getMessage(ErrorEnum.PassageNotFound).getResponse());
      }
    } catch (error) {
      next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
    }
};