const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

const checkAuth = require('../middleware/auth');

router.get('/lessons', checkAuth, async (req, res) => {
    res.send('Witamy w Lekcjach!');
})

module.exports = router;