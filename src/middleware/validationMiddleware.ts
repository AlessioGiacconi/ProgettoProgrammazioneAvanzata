import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorFactory } from '../factory/Errors';
import { ErrorEnum } from '../factory/Message';
import { Pool } from 'pg';
import { error } from 'console';

const errorFactory: ErrorFactory = new ErrorFactory();

const pool = new Pool({
  user: process.env.PGDB_USER,
  host: process.env.PGDB_HOST,
  database: process.env.PGDB_NAME,
  password: process.env.PGDB_PASSWD,
  port: process.env.PGDB_PORT as unknown as number,
})

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const roles = ['user', 'passage'];

export const validateEmail = [
  check('email')
    .optional()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.EmailNotValidAddress).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateUsedEmail = [
  check('email')
    .optional()
    .custom(async (email) => {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT 1 FROM users WHERE email = $1', [email]);
        if(result.rowCount && result.rowCount > 0) {
          return Promise.reject('Email is already in use');
        }
      } finally {
        client.release()
      }
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.EmailNotValidAddress).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validatePassword = [
  check('passwd')
    .optional()
    .notEmpty()
    .withMessage('Password is required.')
    .isString()
    .isLength({ max: 30 })
    .withMessage('Password must be a string with maximum length of 30 characters')
    .matches(passwordRegex)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.UserRegistrationFailed).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateRole = [
  check('role')
  .optional()
  .notEmpty()
  .withMessage('Role is required.')
  .isString()
  .isIn(roles)
  .withMessage(`Role must be one of the following: ${roles.join(', ')}`),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.RoleNotValid).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validatePassageReference = [
  check('passage_reference')
  .optional()
  .custom(async (value, { req }) => {
    if(req.body.role === 'passage') {
      if(!value) {
        return Promise.reject('Passage reference is required for role passage');
      }
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT 1 FROM passages WHERE passage_id = $1', [value]);
        if(result.rowCount === 0) {
          return Promise.reject('Passage reference must refer to a valide passage_id');
        }

        const passageReferenced = await client.query('SELECT 1 FROM users WHERE passage_reference = $1', [value]);
        if (passageReferenced.rowCount && passageReferenced.rowCount > 0) {
          return Promise.reject('This passage reference is already used by another passage');
        }
      } finally {
        client.release();
      }
    }
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const errorResponse = errorFactory.getMessage(ErrorEnum.UserRegistrationFailed).getResponse();
      return res.status(errorResponse.status).json({
        ...errorResponse,
        errors: errors.array()
      });
    }
    next();
  }
];