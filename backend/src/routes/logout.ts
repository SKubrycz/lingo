const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get('/logout', async (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Wylogowano');
});

module.exports = router;