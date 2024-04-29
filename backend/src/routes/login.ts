const express = require('express');
const router = express.Router();

const queries = require('../assets/queries');

const comparePassword = require('../utilities/comparePassword');

router.post('/login', async (req, res) => {
    try {
        const { login, password } = await req.body;

        console.log(`posted in /login: ${login}, ${password}`);


        const result = await queries.findOneUser(login);
        const comparison = await comparePassword(password, result.password);
        console.log(`comparison: ${comparison}`);

        if (comparison === false) return res.status(400).send('Niepoprawne hasło');

        return res.status(200).send('Zalogowano');
    } catch (error) {
        res.status(500).send(`Error /login ${error}`);
    }
});

module.exports = router;
