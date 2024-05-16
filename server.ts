import express, { Request, Response, json } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

// Routes:
app.get('/hello', (req: Request, res: Response) => {
    return res.status(200).send('Hello World');
});

app.get('/hello/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    if (!username) return res.status(400).send('Username is required');
    try {
        return res.status(200).send(`Hello ${username}`);
    } catch (err) {
        return res.status(500).send('Something went wrong');
    }
});

app.post('/hello', (req: Request, res: Response) => {
    const { username } = req.body;
    if (!username) return res.status(400).send('Username is required');
    try {
        return res.status(200).send(`Hello ${username}`);
    } catch (err) {
        return res.status(500).send('Something went wrong');
    }
});


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});