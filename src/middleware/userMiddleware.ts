/**
 * @file userMiddleware.ts
 * @description Questo file contiene i middleware relativi alla gestione dell'autenticazione e autorizzazione degli utenti.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';

const errorFactory: ErrorFactory = new ErrorFactory();

/**
 * Middleware per la verifica del token JWT.
 * Controlla se il token è presente nell'intestazione di autorizzazione della richiesta,
 * lo verifica e decodifica il token. Se il token è valido, viene aggiunto l'oggetto decodificato
 * alla richiesta; altrimenti, viene restituito un errore di autenticazione.
 * 
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.JwtNotValid).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }

  try {
    jwt.verify(token, process.env.PK as string, (err, decoded) => {
      if (err) {
        const errorResponse = errorFactory.getMessage(ErrorEnum.JwtNotValid).getResponse();
        return res.status(errorResponse.status).json(errorResponse);
      }
      (req as any).decodedToken = decoded; // Passiamo il token decodificato a req.decodedToken
      next();
    });
  } catch (error) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.JwtNotValid).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};

/**
 * Middleware per la verifica del ruolo Admin.
 * Controlla se l'utente ha il ruolo di amministratore. Se sì, passa al middleware successivo;
 * altrimenti, restituisce un errore di autorizzazione.
 * 
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export const checkRoleAdmin = (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = (req as any).decodedToken;

  if (decoded && decoded.role === 'admin') {
    next();
  } else {
    const errorResponse = errorFactory.getMessage(ErrorEnum.ForbiddenAdminRole).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};

/**
 * Middleware per la verifica del ruolo Admin o Varco.
 * Controlla se l'utente ha il ruolo di amministratore o varco. Se sì, passa al middleware successivo;
 * altrimenti, restituisce un errore di autorizzazione.
 * 
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export const checkRoleAdminOrVarco = (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = (req as any).decodedToken;
  console.log('Decoded Token:', decoded); // Debug: stampa il token decodificato

  if (decoded && (decoded.role === 'admin' || decoded.role === 'passage')) {
    next();
  } else {
    const errorResponse = errorFactory.getMessage(ErrorEnum.ForbiddenAdminOrPassageRole).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};

/**
 * Middleware per la verifica se l'utente è sospeso.
 * Controlla se l'utente è sospeso. Se sì, restituisce un errore di autorizzazione;
 * altrimenti, passa al middleware successivo.
 * 
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export const checkSuspended = (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = (req as any).decodedToken;
  console.log('Decoded Token:', decoded); // Debug: stampa il token decodificato

  if (decoded && decoded.is_suspended) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.ForbiddenSuspended).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }
  next();
};

/**
 * Middleware per la verifica del ruolo Admin o Utente.
 * Controlla se l'utente ha il ruolo di amministratore o utente. Se sì, passa al middleware successivo;
 * altrimenti, restituisce un errore di autorizzazione.
 * 
 * @param req - L'oggetto della richiesta
 * @param res - L'oggetto della risposta
 * @param next - La funzione next per passare al middleware successivo
 */
export const checkRoleAdminOrUser = (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = (req as any).decodedToken;
  console.log('Decoded Token:', decoded); // Debug: stampa il token decodificato

  if (decoded && (decoded.role === 'admin' || decoded.role === 'user')) {
    next();
  } else {
    const errorResponse = errorFactory.getMessage(ErrorEnum.ForbiddenAdminOrPassageRole).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};