import { Router } from 'express';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/new_user', createUser);
userRouter.get('/user/:id', getUser);
userRouter.put('/update_user/:id', updateUser);
userRouter.delete('/delete_user/:id', deleteUser);

export default userRouter;