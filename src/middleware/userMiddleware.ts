import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';

const errorFactory: ErrorFactory = new ErrorFactory();

// Middleware per la verifica del token JWT
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

// Middleware per la verifica del ruolo Admin
export const checkRoleAdmin = (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = (req as any).decodedToken;

  if (decoded && decoded.role === 'admin') {
    next();
  } else {
    const errorResponse = errorFactory.getMessage(ErrorEnum.ForbiddenAdminRole).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};

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

export const checkSuspended = (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = (req as any).decodedToken;
  console.log('Decoded Token:', decoded); // Debug: stampa il token decodificato

  if (decoded && decoded.is_suspended) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.ForbiddenSuspended).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }
  next();
};

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