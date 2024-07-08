import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = Number(process.env.PORT);
const host = String(process.env.HOST);

app.get("/", (req: Request, res: Response) => {
    res.send("Bruh");
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});