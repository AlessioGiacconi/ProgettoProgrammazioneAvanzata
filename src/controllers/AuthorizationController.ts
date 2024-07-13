import { Request, Response, NextFunction} from 'express';
import { AuthorizationModel } from '../models/AuthorizationModel';
import { ErrorEnum, SuccessEnum } from '../factory/Message';
import { ErrorFactory } from '../factory/Errors';
import { SuccessFactory} from '../factory/Successes';

export const insertAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { badge, passage } = req.body;
      const authorization = await AuthorizationModel.create({ badge, passage });
      const response = new SuccessFactory().getMessage(SuccessEnum.AuthorizationCreatedSuccess).getResponse();
      res.status(response.status).json({ ...response, data: authorization });
    } catch (error) {
      next(new ErrorFactory().getMessage(ErrorEnum.PassageCreationFailed).getResponse());
    }
  };

  export const deleteAuthentication = async (req: Request, res: Response, next: NextFunction) => {
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
      next(new ErrorFactory().getMessage(ErrorEnum.InternalServerError).getResponse());
    }
  };

