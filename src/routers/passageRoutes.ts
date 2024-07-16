/**
 * @file passageRoutes.ts
 * @description  Questo file definisce le rotte per le operazioni sui varchi utilizzando Express Router.
 */

import { Router } from 'express';
import { getAllPassages, createPassage, getPassage, updatePassage, deletePassage } from '../controllers/passageController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';
import { validatePassage, validateUpdatePassage } from '../middleware/passageMIddlware';

/**
 * Creazione di un'istanza del router di Express.
 */
const passagesRouter = Router();

/**
 * @route GET /passages
 * @description Rota per ottenere tutti i passaggi. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller getAllPassages - Controller per gestire il recupero di tutti i passaggi.
 */
passagesRouter.get('/passages',checkJWT, checkRoleAdmin, getAllPassages);

/**
 * @route POST /passage
 * @description Rota per creare un nuovo passaggio. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @middleware validatePassage - Middleware per validare i dati del passaggio.
 * @controller createPassage - Controller per gestire la creazione di un nuovo passaggio.
 */
passagesRouter.post('/passage', checkJWT, checkRoleAdmin, validatePassage, createPassage);

/**
 * @route GET /passage/:id
 * @description Rota per ottenere un passaggio per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller getPassage - Controller per gestire il recupero di un passaggio per ID.
 */
passagesRouter.get('/passage/:id', checkJWT, checkRoleAdmin, getPassage);

/**
 * @route PUT /passage/:id
 * @description Rota per aggiornare un passaggio per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @middleware validateUpdatePassage - Middleware per validare i dati aggiornati del passaggio.
 * @controller updatePassage - Controller per gestire l'aggiornamento di un passaggio per ID.
 */
passagesRouter.put('/passage/:id', checkJWT, checkRoleAdmin, validateUpdatePassage, updatePassage);

/**
 * @route DELETE /passage/:id
 * @description Rota per eliminare un passaggio per ID. Richiede autenticazione JWT e ruolo di amministratore.
 * @middleware checkJWT - Middleware per verificare il token JWT.
 * @middleware checkRoleAdmin - Middleware per verificare il ruolo di amministratore.
 * @controller deletePassage - Controller per gestire l'eliminazione di un passaggio per ID.
 */
passagesRouter.delete('/passage/:id', checkJWT, checkRoleAdmin, deletePassage);

export default passagesRouter;