import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';

const errorFactory: ErrorFactory = new ErrorFactory();

// Middleware per la verifica dell'email di input
export const checkInputEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (typeof email !== 'string') {
    const errorResponse = errorFactory.getMessage(ErrorEnum.EmailNotValidAddress).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.EmailNotValidAddress).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }

  next();
};

// Middleware per la verifica della password di input
export const checkInputPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (typeof password !== 'string' || password.length > 50) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.LoginBadRequest).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }

  next();
};

// Middleware per la verifica del token JWT
export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const errorResponse = errorFactory.getMessage(ErrorEnum.JwtNotValid).getResponse();
    return res.status(errorResponse.status).json(errorResponse);
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
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
    const errorResponse = errorFactory.getMessage(ErrorEnum.Forbidden).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};

// Middleware per la verifica del token di input
export const checkInputToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  if (typeof token === 'number' && token > 0) {
    next();
  } else {
    const errorResponse = errorFactory.getMessage(ErrorEnum.TokenChargeBadRequest).getResponse();
    res.status(errorResponse.status).json(errorResponse);
  }
};