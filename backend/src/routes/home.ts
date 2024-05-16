const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

router.get('/', auth.isAuthenticated, async (req, res) => {
    let sessionUser = false;
    if (res.user) {
        sessionUser = true;
        res.status(403).send(sessionUser);
    } else {
        res.status(200).send(sessionUser);
    }
});


module.exports = router;