const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/logout', async (req, res) => {
    console.log('route get /logout: ');

    res.clearCookie('token');
    res.status(200).send('Wylogowano');
});

module.exports = router;