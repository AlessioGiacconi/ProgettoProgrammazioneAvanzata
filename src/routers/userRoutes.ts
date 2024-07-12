import { Router } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser, getSuspendedBadges, reactivateBadges } from '../controllers/userController';
import { checkRoleAdmin, checkJWT } from '../middleware/userMiddleware';
const userRouter = Router();

userRouter.get('/users', checkJWT, checkRoleAdmin, getAllUsers);
userRouter.get('/user/:id', checkJWT, checkRoleAdmin, getUser);
userRouter.put('/user/:id', checkJWT, checkRoleAdmin, updateUser);
userRouter.delete('/user/:id', checkJWT, checkRoleAdmin, deleteUser);

userRouter.get('/suspended-badges', checkJWT, checkRoleAdmin, getSuspendedBadges);

userRouter.put('/reactivate-badges', checkJWT, checkRoleAdmin, reactivateBadges);

export default userRouter;