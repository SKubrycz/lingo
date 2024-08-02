const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

const queries = require('../assets/queries');

const comparePassword = require('../utilities/comparePassword');

router.post('/login', async (req, res) => {
    try {
        const { login, password } = await req.body;

        console.log(`posted in /login: ${login}, ${password}`);


        const result = await queries.findOneUserByLogin(login);
        if (!result) return res.status(404).send('Nie znaleziono użytkownika');

        const comparison = await comparePassword(password, result.password);
        console.log(`comparison: ${comparison}`);

        if (comparison === false) return res.status(400).send('Niepoprawne hasło');

        const token = jwt.sign({ login: login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        console.log(token);

        const minutes = 60;

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * minutes,
        });

        return res.status(200).send('Zalogowano');
    } catch (error) {
        res.status(500).send(`Error /login ${error}`);
    }
});

module.exports = router;
