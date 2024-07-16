/**
 * @file authorizationRoutes.ts
 * @description  Questo file definisce le rotte per le operazioni di autenticazione utilizzando Express Router.
 */

import { Router } from 'express';
import { insertAuthentication, deleteAuthentication } from '../controllers/AuthorizationController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';

/**
 * Creazione di un'istanza del router di Express.
 */
const authorizationRouter = Router();

/**
 * @route POST /authentication
 * @description Rota per l'inserimento di un'autenticazione. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller insertAuthentication - Controller per gestire l'inserimento dell'autenticazione.
 */
authorizationRouter.post('/authentication', checkJWT, checkRoleAdmin, insertAuthentication);

/**
 * @route DELETE /authentication/:badge/:passage
 * @description Rota per la cancellazione di un'autenticazione. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller deleteAuthentication - Controller per gestire la cancellazione dell'autenticazione.
 */
authorizationRouter.delete('/authentication/:badge/:passage', checkJWT, checkRoleAdmin, deleteAuthentication);

export default authorizationRouter;