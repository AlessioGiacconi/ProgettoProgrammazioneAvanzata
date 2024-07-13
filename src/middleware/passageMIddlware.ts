import {Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';
import { error } from 'console';

const errorFactory: ErrorFactory = new ErrorFactory();

export const validatePassage = [
    check('level')
    .notEmpty()
    .withMessage('Level is required.')
    .isInt()
    .withMessage('Level must be an integer.'),
    check('needs_dpi')
    .notEmpty()
    .withMessage('Needs_dpi is required.')
    .isBoolean()
    .withMessage('Needs_dpi must be a boolean value'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorResponse = errorFactory.getMessage(ErrorEnum.ValidationError).getResponse();
            return res.status(errorResponse.status).json({
                ...errorResponse,
                errors: errors.array()
            });
        }
        next();
    }
];

export const validateUpdatePassage = [
    check('level')
    .optional()
    .isInt()
    .withMessage('Level must me an integer.'),
    check('needs_dpi')
    .optional()
    .isBoolean()
    .withMessage('Needs_dpi must be a boolean'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorResponse = errorFactory.getMessage(ErrorEnum.ValidationError).getResponse();
            return res.status(errorResponse.status).json({
                ...errorResponse,
                errors: errors.array()
            });
        }
        next();
    }
];