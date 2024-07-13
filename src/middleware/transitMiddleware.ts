import {Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';
import { error } from 'console';

const errorFactory: ErrorFactory = new ErrorFactory();

export const validateTransit = [
    check('passage')
    .notEmpty()
    .withMessage('Passage is required.'),
    check('badge')
    .notEmpty()
    .withMessage('Badge is required.'),
    check('violation_dpi')
    .notEmpty()
    .withMessage('Violation DPI is required.'),
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
]