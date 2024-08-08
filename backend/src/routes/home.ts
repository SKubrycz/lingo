const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

router.get('/', auth.isAuthenticated, async (req, res) => {
    console.log('route get /: ');
    
    let sessionUser = false;
    if (req.login) {
        sessionUser = true;
        res.status(403).send(sessionUser);
    } else {
        res.status(200).send(sessionUser);
    }

    console.log(`sessionUser ${sessionUser}`);
});


module.exports = router;