const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    const { email, login, password, passwordAgain } = req.body;

    console.log(`posted in /register: ${email} ${login} ${password} ${passwordAgain}`);

    res.status(200).send('Registered')
});

module.exports = router;