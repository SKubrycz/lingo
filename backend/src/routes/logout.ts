import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.status(200).send('Wylogowano');
});

export default router;