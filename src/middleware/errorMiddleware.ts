/**
 * @file errorMiddleware.ts
 * @description Questo file contiene i middleware per la gestione degli errori.
 */

import { Request, Response, NextFunction } from 'express';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';
import { UniqueConstraintError, ValidationError, ForeignKeyConstraintError } from 'sequelize';


// Istanza della factory di messaggi di errore
const errorFactory: ErrorFactory = new ErrorFactory();

/**
 * Middleware per la gestione degli errori definiti.
 * Verifica se l'errore è uno degli errori definiti nell'enumerazione ErrorEnum. 
 * Se sì, crea una risposta di errore utilizzando ErrorFactory e la invia al client.
 * Altrimenti, passa l'errore al middleware successivo.
 * 
 * @param err - L'errore che si è verificato
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export function errorHandler(err: ErrorEnum, req: Request, res: Response, next: NextFunction) {
    // Controlla se l'errore è uno degli errori definiti (ad esempio, proviene da una nostra enumerazione)
    if(Object.values(ErrorEnum).includes(err)) {
        const errorResponse = errorFactory.getMessage(err).getResponse();
        console.log("Error Handler: " + errorResponse.message);
        res.setHeader('Content-Type', errorResponse.type);
        res.status(errorResponse.status).json({
            response: errorResponse.message,
            data: {}
        });
    } else {
        next(err);
    }
};

/**
 * Middleware per la gestione di errori non mappati.
 * Gestisce errori generici non definiti nell'enumerazione ErrorEnum. 
 * Registra lo stack di errore e il messaggio di errore sulla console, quindi crea una risposta di errore 
 * generica utilizzando ErrorFactory e la invia al client.
 * 
 * @param err - L'errore che si è verificato
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("Error Stack:", err.stack);
    console.error("Error Message:", err.message);

    if (err instanceof UniqueConstraintError) {
        const errorResponse = errorFactory.getMessage(ErrorEnum.UniqueConstraintViolation).getResponse();
        res.status(errorResponse.status).json({
            response: errorResponse.message,
            details: err.errors.map((e: any) => e.message)
        });
    } else if (err instanceof ValidationError) {
        const errorResponse = errorFactory.getMessage(ErrorEnum.ValidationError).getResponse();
        res.status(errorResponse.status).json({
            response: errorResponse.message,
            details: err.errors.map((e: any) => e.message)
        });
    } else if (err instanceof ForeignKeyConstraintError) {
        const errorResponse = errorFactory.getMessage(ErrorEnum.ForeignKeyConstraintViolation).getResponse();
        res.status(errorResponse.status).json({
            response: errorResponse.message,
            details: err.message
        });
    } else {
        const errorResponse = errorFactory.getMessage(ErrorEnum.InternalServerError).getResponse();
        
        res.setHeader('Content-Type', errorResponse.type);
        res.status(errorResponse.status).json({
            response: errorResponse.message,
            data: {}
        });
    }
};