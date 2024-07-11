import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit } from '../controllers/transitController';

const TransitRouter = Router();

TransitRouter.get('/transits', getAllTransit);
TransitRouter.get('/transit/:id', getTransit);
TransitRouter.post('/transit', createTransit);
TransitRouter.put('/transit/:id', updateTransit);
TransitRouter.delete('/transit/:id', deleteTransit);

export default TransitRouter;