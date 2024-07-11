import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit, getAccessStats, downloadReport } from '../controllers/transitController';

const TransitRouter = Router();

TransitRouter.get('/transits', getAllTransit);
TransitRouter.get('/transit/:id', getTransit);
TransitRouter.post('/transit', createTransit);
TransitRouter.put('/transit/:id', updateTransit);
TransitRouter.delete('/transit/:id', deleteTransit);

TransitRouter.get('/transit-stats/:badge_id', getAccessStats);
TransitRouter.get('/download-report', downloadReport);

export default TransitRouter;