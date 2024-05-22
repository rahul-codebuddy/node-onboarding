import { Request, Response } from "express";
import bookRouter from './BookRoutes';
import authorRouter from './AuthorRoutes';
import genreRouter from './GenreRoutes';

const routes = (app: any) => {
    app.use('/book', bookRouter);
    app.use('/author', authorRouter);
    app.use('/genre', genreRouter);



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
};

export default routes;