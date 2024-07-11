import { Router } from 'express';
import { insertAuthentication, deleteAuthentication } from '../controllers/AuthorizationController';

const authorizationRouter = Router();

authorizationRouter.post('/authentication', insertAuthentication);
authorizationRouter.delete('/authentication/:badge/:passage', deleteAuthentication);

export default authorizationRouter;