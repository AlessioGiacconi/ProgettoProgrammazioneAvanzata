/**
 * @file transitRoutes.ts
 * @description  Questo file definisce le rotte per le operazioni sui transiti utilizzando Express Router.
 */

import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit, getAccessStats, downloadPassageReport, downloadUserReport } from '../controllers/transitController';
import { checkRoleAdmin, checkSuspended, checkRoleAdminOrVarco, checkRoleAdminOrUser, checkJWT } from '../middleware/userMiddleware';    
import { validateTransit, validateUpdateTransit } from '../middleware/transitMiddleware';

/**
 * Creazione di un'istanza del router di Express.
 */
const TransitRouter = Router();

/**
 * @route GET /transits
 * @description Rota per ottenere tutti i transiti. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller getAllTransit - Controller per gestire il recupero di tutti i transiti.
 */
TransitRouter.get('/transits', checkJWT, checkRoleAdmin, getAllTransit);

/**
 * @route GET /transit/:id
 * @description Rota per ottenere un transito per ID. Richiede autenticazione JWT e verifica sospensione.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkSuspended - Middleware per verificare se l'utente è sospeso.
 * @controller getTransit - Controller per gestire il recupero di un transito per ID.
 */
TransitRouter.get('/transit/:id', checkJWT, checkSuspended, getTransit);


/**
 * @route POST /transit
 * @description Rota per creare un nuovo transito. Richiede autenticazione JWT e ruolo di amministratore o utente "passage".
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdminOrVarco - Middleware per verificare il ruolo di amministratore o utente "passage".
 * @middleware validateTransit - Middleware per validare i dati del transito.
 * @controller createTransit - Controller per gestire la creazione di un nuovo transito.
 */
TransitRouter.post('/transit', checkJWT, checkRoleAdminOrVarco, validateTransit, createTransit);

/**
 * @route PUT /transit/:id
 * @description Rota per aggiornare un transito per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @middleware validateUpdateTransit - Middleware per validare i dati aggiornati del transito.
 * @controller updateTransit - Controller per gestire l'aggiornamento di un transito per ID.
 */
TransitRouter.put('/transit/:id', checkJWT, checkRoleAdmin, validateUpdateTransit, updateTransit);


/**
 * @route DELETE /transit/:id
 * @description Rota per eliminare un transito per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller deleteTransit - Controller per gestire l'eliminazione di un transito per ID.
 */
TransitRouter.delete('/transit/:id', checkJWT, checkRoleAdmin, deleteTransit);

/**
 * @route GET /transit-stats/:badge_id
 * @description Rota per ottenere le statistiche di accesso per un badge specifico. Richiede autenticazione JWT e verifica sospensione.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkSuspended - Middleware per verificare se l'utente è sospeso.
 * @controller getAccessStats - Controller per gestire il recupero delle statistiche di accesso.
 */
TransitRouter.get('/transit-stats/:badge_id', checkJWT, checkSuspended, getAccessStats);

/**
 * @route GET /passage-report
 * @description Rota per scaricare il report dei passaggi. Richiede autenticazione JWT, ruolo di amministratore o utente e verifica sospensione.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdminOrUser - Middleware per verificare il ruolo di amministratore o utente.
 * @middleware checkSuspended - Middleware per verificare se l'utente è sospeso.
 * @controller downloadPassageReport - Controller per gestire il download del report dei passaggi.
 */
TransitRouter.get('/passage-report', checkJWT, checkRoleAdminOrUser, checkSuspended, downloadPassageReport);

/**
 * @route GET /user-report
 * @description Rota per scaricare il report degli utenti. Richiede autenticazione JWT, ruolo di amministratore o utente e verifica sospensione.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdminOrUser - Middleware per verificare il ruolo di amministratore o utente.
 * @middleware checkSuspended - Middleware per verificare se l'utente è sospeso.
 * @controller downloadUserReport - Controller per gestire il download del report degli utenti.
 */
TransitRouter.get('/user-report',checkJWT, checkRoleAdminOrUser, checkSuspended, downloadUserReport);

export default TransitRouter;