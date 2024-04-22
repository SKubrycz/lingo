const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { login, password } = await req.body;

        console.log(`posted in /login: ${login}, ${password}`);

        res.status(200).send('Logged in');
    } catch (error) {
        res.status(500).send(`Error /login ${error}`);
    }
});

module.exports = router;
