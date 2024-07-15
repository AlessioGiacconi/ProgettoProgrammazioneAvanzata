/**
 * @file passageController.ts
 * @description Questo file contiene i controller per la gestione dei varchi.
 */
import { Request, Response, NextFunction } from 'express';
import { PassagesModel } from '../models/PassagesModel';
import { ErrorEnum, SuccessEnum } from '../factory/Message';
import { ErrorFactory } from '../factory/Errors';
import { SuccessFactory} from '../factory/Successes';

/**
 * @function getAllPassages
 * @description Recupera tutti i passaggi dal database.
 * @param {Request} req - La richiesta HTTP.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const getAllPassages = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const passages = await PassagesModel.findAll();
        const response = new SuccessFactory().getMessage(SuccessEnum.PassageRetrievedSuccess).getResponse();
        res.status(response.status).json({ ...response, data: passages });
    } catch (error) {
        next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
    }
};

/**
 * @function createPassage
 * @description Crea un nuovo passaggio nel database.
 * @param {Request} req - La richiesta HTTP, che contiene il livello e l'indicazione se è necessario il DPI nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
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

/**
 * @function getPassage
 * @description Recupera un passaggio specifico dal database.
 * @param {Request} req - La richiesta HTTP, che contiene l'ID del passaggio nei parametri della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
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

/**
 * @function updatePassage
 * @description Aggiorna un passaggio specifico nel database.
 * @param {Request} req - La richiesta HTTP, che contiene l'ID del passaggio nei parametri della richiesta e il livello e l'indicazione se è necessario il DPI nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const updatePassage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { level, needs_dpi } = req.body;

      const passage = await PassagesModel.findByPk(id);

      if (passage) {
        if(level !== undefined) {
          passage.set('level', level)
        }
        if(needs_dpi !== undefined) {
          passage.set('needs_dpi', needs_dpi)
        }
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

/**
 * @function deletePassage
 * @description Elimina un passaggio specifico dal database.
 * @param {Request} req - La richiesta HTTP, che contiene l'ID del passaggio nei parametri della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
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