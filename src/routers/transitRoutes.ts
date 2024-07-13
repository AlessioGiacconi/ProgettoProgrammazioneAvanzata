import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit, getAccessStats, downloadPassageReport, downloadUserReport } from '../controllers/transitController';
import { checkRoleAdmin, checkSuspended, checkRoleAdminOrVarco, checkRoleAdminOrUser, checkJWT } from '../middleware/userMiddleware';    
import { validateTransit, validateUpdateTransit } from '../middleware/transitMiddleware';

const TransitRouter = Router();

TransitRouter.get('/transits', checkJWT, checkRoleAdmin, getAllTransit);
TransitRouter.get('/transit/:id', checkJWT, checkSuspended, getTransit);
TransitRouter.post('/transit', checkJWT, checkRoleAdminOrVarco, validateTransit, createTransit);
TransitRouter.put('/transit/:id', checkJWT, checkRoleAdmin, validateUpdateTransit, updateTransit);
TransitRouter.delete('/transit/:id', checkJWT, checkRoleAdmin, deleteTransit);

TransitRouter.get('/transit-stats/:badge_id', checkJWT, checkSuspended, getAccessStats);
TransitRouter.get('/passage-report', checkJWT, checkRoleAdminOrUser, checkSuspended, downloadPassageReport);
TransitRouter.get('/user-report',checkJWT, checkRoleAdminOrUser, checkSuspended, downloadUserReport);

export default TransitRouter;