/**
 * @file passageMiddleware.ts
 * @description Questo file contiene i middleware per la validazione delle richieste dei dati relative ai varchi.
 */

import {Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';
import { error } from 'console';

const errorFactory: ErrorFactory = new ErrorFactory();

/**
 * Middleware per la validazione dei campi di una richiesta di creazione di un nuovo "passage".
 * Verifica che il campo "level" non sia vuoto e sia un intero, e che il campo "needs_dpi" non sia vuoto e sia un booleano.
 * Se ci sono errori di validazione, risponde con un messaggio di errore.
 * 
 * @type {Array}
 */
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

/**
 * Middleware per la validazione dei campi di una richiesta di aggiornamento di un "passage".
 * Verifica opzionalmente che il campo "level" sia un intero e che il campo "needs_dpi" sia un booleano.
 * Se ci sono errori di validazione, risponde con un messaggio di errore.
 * 
 * @type {Array}
 */
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