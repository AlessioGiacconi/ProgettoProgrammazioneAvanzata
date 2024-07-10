import { Router } from 'express';
import { insertAuthentication, deleteAuthentication } from '../controllers/AuthenticationController';

const authenticationRouter = Router();

authenticationRouter.post('/authentication', insertAuthentication);
authenticationRouter.delete('/authentication/:badge/:passage', deleteAuthentication);

export default authenticationRouter;