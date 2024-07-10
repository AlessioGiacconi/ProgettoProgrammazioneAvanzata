import { Router } from 'express';
import { getAllPassages, createPassage, getPassage, updatePassage, deletePassage } from '../controllers/passageController';

const passagesRouter = Router();

passagesRouter.get('/passages', getAllPassages);
passagesRouter.post('/passage', createPassage);
passagesRouter.get('/passage/:id', getPassage);
passagesRouter.put('/passage/:id', updatePassage);
passagesRouter.delete('/passage/:id', deletePassage);

export default passagesRouter;