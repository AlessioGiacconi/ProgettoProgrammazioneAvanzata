import { Request, Response, NextFunction } from 'express';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';

// Istanza della factory di messaggi di errore
const errorFactory: ErrorFactory = new ErrorFactory();

// Middleware per la gestione degli errori
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

// Middleware per la gestione di errori non mappati
export function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("Error Stack:", err.stack);
    console.error("Error Message:", err.message);
    const errorResponse = errorFactory.getMessage(ErrorEnum.InternalServerError).getResponse();
    
    res.setHeader('Content-Type', errorResponse.type);
    res.status(errorResponse.status).json({
        response: errorResponse.message,
        data: {}
    });
};