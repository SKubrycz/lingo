import express, { Request, Response } from 'express';

import { RequestLogin } from '../middleware/auth';
import { checkAuth } from '../middleware/auth';
import { findLessons, findOneUserByLogin } from '../assets/queries';

const router = express.Router();

router.get('/lessons', checkAuth, async (req: RequestLogin, res: Response) => {
    console.log('route get /lessons: ');

    const result = await findLessons();

    if (!req.login) return res.status(500).send('Coś poszło nie tak po stronie serwera');

    const userResult = await findOneUserByLogin(req.login);
    if (userResult) {
        console.log(userResult.login);

        const results = {
            result: result,
            login: userResult.login
        }
        
        res.send(results);
    } else {
        res.status(404).send('Nie znaleziono użytkownika');
    }
});


export default router;