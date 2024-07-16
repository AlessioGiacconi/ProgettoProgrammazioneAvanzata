/**
 * File principale del server per l'inizializzazione e l'esecuzione dell'applicazione Express.
 * 
 * Importa i moduli e i middleware necessari, imposta le rotte e avvia il server.
 */

import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/userRoutes';
import passageRoutes from './routers/passageRoutes';
import transitRoutes from './routers/transitRoutes';
import authorizationRoutes from './routers/authorizationRoutes';
import { errorHandler, genericErrorHandler } from './middleware/errorMiddleware';
import { registerUser, loginUser } from './controllers/userController';
import './utils/cronJob';
import { validateEmail, validateUsedEmail, validatePassword, validateRole, validatePassageReference } from './middleware/validationMiddleware';

// Carica le variabili d'ambiente dal file .env
dotenv.config();

/**
 * Inizializza l'applicazione Express.
 */
const app = express();
const port = Number(process.env.PORT);
const host = String(process.env.HOST);

// Middleware per il parsing dei corpi JSON
app.use(express.json());

/**
 * Definisce le rotte per le diverse risorse.
 */
app.use('/badges', userRoutes);
app.use('/passages', passageRoutes);
app.use('/transits', transitRoutes);
app.use('/auth', authorizationRoutes);

// Middleware per la gestione degli errori
app.use(errorHandler);
app.use(genericErrorHandler);

/**
 * Rotta principale.
 * @route GET /
 */
app.get("/", (req: Request, res: Response) => {
    res.send("Register or Log into the system.");
});

/**
 * Rotta per la registrazione degli utenti.
 * Valida l'email, verifica se l'email è già in uso, valida la password, il ruolo e il riferimento del varco.
 * Chiama la funzione di controllo registerUser.
 * @route POST /register
 */
app.post("/register", validateEmail, validateUsedEmail, validatePassword, validateRole, validatePassageReference, (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res, next);
});

/**
 * Rotta per il login degli utenti.
 * Valida l'email e la password.
 * Chiama la funzione di controllo loginUser.
 * @route POST /login
 */
app.post("/login", validateEmail, validatePassword, (req: Request, res: Response) => {
    loginUser(req, res);
});

// Avvia il server e ascolta sulla porta e host specificati
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});