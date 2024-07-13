import { Router } from 'express';
import { getAllPassages, createPassage, getPassage, updatePassage, deletePassage } from '../controllers/passageController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';
import { validatePassage, validateUpdatePassage } from '../middleware/passageMIddlware';

const passagesRouter = Router();

passagesRouter.get('/passages',checkJWT, checkRoleAdmin, getAllPassages);
passagesRouter.post('/passage', checkJWT, checkRoleAdmin, validatePassage, createPassage);
passagesRouter.get('/passage/:id', checkJWT, checkRoleAdmin, getPassage);
passagesRouter.put('/passage/:id', checkJWT, checkRoleAdmin, validateUpdatePassage, updatePassage);
passagesRouter.delete('/passage/:id', checkJWT, checkRoleAdmin, deletePassage);

export default passagesRouter;