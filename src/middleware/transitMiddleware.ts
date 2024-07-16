/**
 * @file transitMiddleware.ts
 * @description Questo file contiene i middleware per la validazione delle richieste dei dati relative ai transiti.
 */

import {Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';
import { error } from 'console';

const errorFactory: ErrorFactory = new ErrorFactory();

/**
 * Middleware per la validazione dei campi di una richiesta di creazione di un nuovo "transit".
 * Verifica che i campi "passage", "badge" e "violation_dpi" non siano vuoti.
 * Se ci sono errori di validazione, risponde con un messaggio di errore.
 * 
 * @type {Array}
 */
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
];

/**
 * Middleware per la validazione dei campi di una richiesta di aggiornamento di un "transit".
 * Verifica opzionalmente che il campo "transit_date" sia in formato ISO8601 e che il campo "violation_dpi" sia un booleano.
 * Se ci sono errori di validazione, risponde con un messaggio di errore.
 * 
 * @type {Array}
 */
export const validateUpdateTransit = [
    check('transit_date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
    check('violation_dpi')
    .optional()
    .isBoolean()
    .withMessage('Violation DPI must be a boolean'),
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


