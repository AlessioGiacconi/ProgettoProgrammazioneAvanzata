import { Router } from 'express';
import { getAllTransit, getTransit, createTransit, updateTransit, deleteTransit, getAccessStats, downloadPassageReport, downloadUserReport } from '../controllers/transitController';
import { checkRoleAdmin, checkSuspended, checkRoleAdminOrVarco, checkRoleAdminOrUser ,checkJWT } from '../middleware/userMiddleware';    

const TransitRouter = Router();

TransitRouter.get('/transits', checkJWT, checkRoleAdmin, getAllTransit);
TransitRouter.get('/transit/:id', checkJWT, checkSuspended, getTransit);
TransitRouter.post('/transit', checkJWT, checkRoleAdminOrVarco, createTransit);
TransitRouter.put('/transit/:id', checkJWT, checkRoleAdmin, updateTransit);
TransitRouter.delete('/transit/:id', checkJWT, checkRoleAdmin, deleteTransit);

TransitRouter.get('/transit-stats/:badge_id', checkJWT, getAccessStats);
TransitRouter.get('/passage-report', checkJWT, checkRoleAdminOrUser ,downloadPassageReport);
TransitRouter.get('/user-report',checkJWT, checkRoleAdminOrUser ,downloadUserReport);

export default TransitRouter;