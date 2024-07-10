import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/userRoutes';
import passageRoutes from './routers/passageRoutes';
import transitRoutes from './routers/transitRoutes';
import authenticationRouter from './routers/authenticationRoutes';
import { errorHandler, genericErrorHandler } from './middleware/errorMiddleware';
import { registerUser, loginUser } from './controllers/userController';

dotenv.config();
const app = express();
const port = Number(process.env.PORT);
const host = String(process.env.HOST);

app.use(express.json());
app.use('/badges', userRoutes);
app.use('/passages', passageRoutes);
app.use('/transits', transitRoutes);
app.use('/auth', authenticationRouter);


app.use(errorHandler);
app.use(genericErrorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("Bruh arcoddio");
});

app.post("/register", (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res, next);
});

app.post("/login", (req: Request, res: Response) =>{
    loginUser(req, res);
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});