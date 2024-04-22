const express = require('express');
const router = express.Router();

const hashData = require('../utilities/hashData');

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const hash = await hashData(password);

        console.log(`posted in /login: ${login}, ${password}, ${hash}`);

        res.status(200).send('Logged in');
    } catch (error) {
        res.status(500).send(`Error /login ${error}`);
    }
});

module.exports = router;