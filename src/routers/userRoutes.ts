/**
 * @file userRoutes.ts
 * @description  Questo file definisce le rotte per le operazioni sugli utenti utilizzando Express Router.
 */

import { Router } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser, getSuspendedBadges, reactivateBadges } from '../controllers/userController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';
import { validateEmail, validateUsedEmail, validatePassword, validateRole, validatePassageReference } from '../middleware/validationMiddleware';

/**
 * Creazione di un'istanza del router di Express.
 */
const userRouter = Router();

/**
 * @route GET /users
 * @description Rotta per ottenere tutti gli utenti. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller getAllUsers - Controller per gestire il recupero di tutti gli utenti.
 */
userRouter.get('/users', checkJWT, checkRoleAdmin, getAllUsers);

/**
 * @route GET /user/:id
 * @description Rotta per ottenere un utente per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller getUser - Controller per gestire il recupero di un utente per ID.
 */
userRouter.get('/user/:id', checkJWT, checkRoleAdmin, getUser);

/**
 * @route PUT /user/:id
 * @description Rotta per aggiornare un utente per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @middleware validateEmail - Middleware per validare l'email.
 * @middleware validateUsedEmail - Middleware per verificare se l'email è già in uso.
 * @middleware validatePassword - Middleware per validare la password.
 * @middleware validateRole - Middleware per validare il ruolo dell'utente.
 * @middleware validatePassageReference - Middleware per validare il riferimento al passaggio.
 * @controller updateUser - Controller per gestire l'aggiornamento di un utente per ID.
 */
userRouter.put('/user/:id', checkJWT, checkRoleAdmin, validateEmail, validateUsedEmail, validatePassword, validatePassageReference, updateUser);

/**
 * @route DELETE /user/:id
 * @description Rotta per eliminare un utente per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller deleteUser - Controller per gestire l'eliminazione di un utente per ID.
 */
userRouter.delete('/user/:id', checkJWT, checkRoleAdmin, deleteUser);

/**
 * @route GET /suspended-badges
 * @description Rotta per ottenere i badge sospesi. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller getSuspendedBadges - Controller per gestire il recupero dei badge sospesi.
 */
userRouter.get('/suspended-badges', checkJWT, checkRoleAdmin, getSuspendedBadges);

/**
 * @route PUT /reactivate-badges
 * @description Rotta per riattivare i badge sospesi. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller reactivateBadges - Controller per gestire la riattivazione dei badge sospesi.
 */
userRouter.put('/reactivate-badges', checkJWT, checkRoleAdmin, reactivateBadges);

export default userRouter;