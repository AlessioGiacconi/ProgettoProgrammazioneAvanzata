import { Request, Response, NextFunction } from 'express';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';

// Istanza della factory di messaggi di errore
const errorFactory: ErrorFactory = new ErrorFactory();

// Middleware per la gestione degli errori
export function errorHandler(err: ErrorEnum, req: Request, res: Response, next: NextFunction) {
    const errorResponse = errorFactory.getMessage(err).getResponse();
    console.log("Error Handler: " + errorResponse.message);

    res.setHeader('Content-Type', errorResponse.type);
    res.status(errorResponse.status).json({
        response: errorResponse.message,
        data: {}
    });
};

// Middleware per la gestione di errori non mappati
export function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    const errorResponse = errorFactory.getMessage(ErrorEnum.InternalServerError).getResponse();
    
    res.setHeader('Content-Type', errorResponse.type);
    res.status(errorResponse.status).json({
        response: errorResponse.message,
        data: {}
    });
};