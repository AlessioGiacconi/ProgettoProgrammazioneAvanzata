import { Router } from 'express';
import { insertAuthentication, deleteAuthentication } from '../controllers/AuthorizationController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';

const authorizationRouter = Router();

authorizationRouter.post('/authentication', checkJWT, checkRoleAdmin, insertAuthentication);
authorizationRouter.delete('/authentication/:badge/:passage', checkJWT, checkRoleAdmin, deleteAuthentication);

export default authorizationRouter;