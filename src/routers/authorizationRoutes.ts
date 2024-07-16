/**
 * @file authorizationRoutes.ts
 * @description  Questo file definisce le rotte per le operazioni di autorizzazione utilizzando Express Router.
 */

import { Router } from 'express';
import { insertAuthorization, deleteAuthorization } from '../controllers/AuthorizationController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';

/**
 * Creazione di un'istanza del router di Express.
 */
const authorizationRouter = Router();

/**
 * @route POST /authorization
 * @description Rota per l'inserimento di un'autorizzazione. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller insertAuthentication - Controller per gestire l'inserimento dell'autenticazione.
 */
authorizationRouter.post('/authorization', checkJWT, checkRoleAdmin, insertAuthorization);

/**
 * @route DELETE /authorization/:badge/:passage
 * @description Rota per la cancellazione di un'autorizzazionee. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller deleteAuthentication - Controller per gestire la cancellazione dell'autenticazione.
 */
authorizationRouter.delete('/authorization/:badge/:passage', checkJWT, checkRoleAdmin, deleteAuthorization);

export default authorizationRouter;