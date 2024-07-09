import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/userRoutes';
import passageRoutes from './routers/passageRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import { registerUser, loginUser } from './controllers/userController';

dotenv.config();
const app = express();
const port = Number(process.env.PORT);
const host = String(process.env.HOST);

app.use(express.json());
app.use('/badges', userRoutes);
app.use('/passages', passageRoutes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("Bruh");
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