/**
 * @file AuthorizationController.ts
 * @description Questo file contiene i controller per la gestione delle autorizzazioni.
 */
import { Request, Response, NextFunction} from 'express';
import { AuthorizationModel } from '../models/AuthorizationModel';
import { ErrorEnum, SuccessEnum } from '../factory/Message';
import { ErrorFactory } from '../factory/Errors';
import { SuccessFactory} from '../factory/Successes';

/**
 * @function insertAuthorization
 * @description Inserisce una nuova autorizzazione nel database.
 * @param {Request} req - La richiesta HTTP, che contiene il badge e il passaggio nel corpo della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const insertAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { badge, passage } = req.body;

      if(!badge || !passage) {
        const response = new ErrorFactory().getMessage(ErrorEnum.AuthorizationCreationFailed).getResponse()
        return res.status(response.status).json(response)
      }

      const authorization = await AuthorizationModel.create({ badge, passage });
      const response = new SuccessFactory().getMessage(SuccessEnum.AuthorizationCreatedSuccess).getResponse();
      res.status(response.status).json({ ...response, data: authorization });
    } catch (error) {
      next(error);
    }
  };

/**
 * @function deleteAuthorization
 * @description Elimina un'autorizzazione dal database.
 * @param {Request} req - La richiesta HTTP, che contiene il badge e il passaggio nei parametri della richiesta.
 * @param {Response} res - La risposta HTTP.
 * @param {NextFunction} next - La funzione next per passare il controllo al middleware di gestione degli errori.
 */
export const deleteAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { badge, passage } = req.params;
      const authorization = await AuthorizationModel.findOne({ where: { badge, passage } });
      if (!authorization) {
        next(new ErrorFactory().getMessage(ErrorEnum.AuthorizationNotFound).getResponse());
        return;
      }
      await authorization.destroy();
      const response = new SuccessFactory().getMessage(SuccessEnum.AuthorizationDeletedSuccess).getResponse();
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

