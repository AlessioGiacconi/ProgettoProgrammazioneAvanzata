import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit, getAccessStats, downloadPassageReport, downloadUserReport } from '../controllers/transitController';
import { checkRoleAdmin, checkRoleAdminOrPassage, checkJWT } from '../middleware/userMiddleware';    

const TransitRouter = Router();

TransitRouter.get('/transits', checkJWT, checkRoleAdmin, getAllTransit);
TransitRouter.get('/transit/:id', getTransit);
TransitRouter.post('/transit', checkJWT, checkRoleAdminOrPassage, createTransit);
TransitRouter.put('/transit/:id', checkJWT, checkRoleAdmin, updateTransit);
TransitRouter.delete('/transit/:id', checkJWT, checkRoleAdmin, deleteTransit);

TransitRouter.get('/transit-stats/:badge_id', getAccessStats);
TransitRouter.get('/passage-report', downloadPassageReport);
TransitRouter.get('/user-report',checkJWT, downloadUserReport);

export default TransitRouter;