import express from 'express';
import jwt from 'jsonwebtoken';

import { findOneUserByLogin } from '../assets/queries';
import comparePassword from '../utilities/comparePassword';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { login, password } = await req.body;

        console.log(`posted in /login: ${login}, ${password}`);

        if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) return;

        const result = await findOneUserByLogin(login);
        if (!result) return res.status(404).send('Nie znaleziono użytkownika');

        const comparison = await comparePassword(password, result.password);
        //console.log(`comparison: ${comparison}`);

        if (comparison === false) return res.status(400).send('Niepoprawne hasło');

        const accessTokenExpiry: number = 1000 * 60 * 60;
        const refreshTokenExpiry: number = 1000 * 60 * 60 * 24 * 30;

        const accessToken: string = jwt.sign({ _id: result._id, login: result.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpiry });
        const refreshToken: string = jwt.sign({ _id: result._id, login: result.login }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiry });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: accessTokenExpiry,
            sameSite: 'strict',
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenExpiry,
            sameSite: 'strict',
        });

        return res.status(200).send('Zalogowano');
    } catch (error) {
        res.status(500).send(`Error /login ${error}`);
    }
});

export default router;
