import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit, getAccessStats, downloadPassageReport, downloadUserReport } from '../controllers/transitController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';    

const TransitRouter = Router();

TransitRouter.get('/transits', checkJWT,checkRoleAdmin, getAllTransit);
TransitRouter.get('/transit/:id', getTransit);
TransitRouter.post('/transit', createTransit);
TransitRouter.put('/transit/:id', updateTransit);
TransitRouter.delete('/transit/:id', deleteTransit);

TransitRouter.get('/transit-stats/:badge_id', getAccessStats);
TransitRouter.get('/passage-report', downloadPassageReport);
TransitRouter.get('/user-report',checkJWT, downloadUserReport);

export default TransitRouter;