import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';

const errorFactory: ErrorFactory = new ErrorFactory();

export const validateEmail = [
  check('email')
    .isEmail()
    .withMessage('Invalid email address'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.EmailNotValidAddress).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validatePassword = [
  check('passwd')
    .isString()
    .isLength({ max: 50 })
    .withMessage('Password must be a string with maximum length of 50 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.LoginBadRequest).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];