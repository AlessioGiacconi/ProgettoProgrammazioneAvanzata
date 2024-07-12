import { Router } from 'express';
import { getAllPassages, createPassage, getPassage, updatePassage, deletePassage } from '../controllers/passageController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';

const passagesRouter = Router();

passagesRouter.get('/passages',checkJWT, checkRoleAdmin, getAllPassages);
passagesRouter.post('/passage', checkJWT, checkRoleAdmin, createPassage);
passagesRouter.get('/passage/:id', checkJWT, checkRoleAdmin, getPassage);
passagesRouter.put('/passage/:id', checkJWT, checkRoleAdmin, updatePassage);
passagesRouter.delete('/passage/:id', checkJWT, checkRoleAdmin, deletePassage);

export default passagesRouter;