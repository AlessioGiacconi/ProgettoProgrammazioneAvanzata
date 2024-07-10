import { Router } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser, getSuspendedBadges, reactivateBadges } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/user/:id', getUser);
userRouter.put('/user/:id', updateUser);
userRouter.delete('/user/:id', deleteUser);

userRouter.get('/suspended-badges', getSuspendedBadges);

userRouter.put('/reactivate-badges', reactivateBadges);

export default userRouter;