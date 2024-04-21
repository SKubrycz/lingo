const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    console.log(`posted in /login: ${login}, ${password}`);

    res.status(200).send('Logged in');
});

module.exports = router;