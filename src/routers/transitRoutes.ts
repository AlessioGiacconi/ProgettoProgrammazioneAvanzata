import { Router } from 'express';
import { getAllTransit, getTransit, updateTransit, deleteTransit } from '../controllers/transitController';

const TransitRouter = Router();

TransitRouter.get('/transits', getAllTransit);
TransitRouter.get('/transit/:id', getTransit);
TransitRouter.put('/update_transit/:id', updateTransit);
TransitRouter.delete('/delete_transit/:id', deleteTransit);

export default TransitRouter;