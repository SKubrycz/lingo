const express = require('express');
const router = express.Router();

const hashData = require('../utilities/hashData');

router.post('/register', async (req, res) => {
    try {
        const { email, login, password, passwordAgain } = req.body;

        const hash = await hashData(password);

        console.log(`posted in /register: ${email} ${login} ${password} ${passwordAgain}, ${hash}`);

        res.status(200).send('Registered');
    } catch (error) {
        res.status(500).send(`Error /register ${error}`);
    }
});

module.exports = router;