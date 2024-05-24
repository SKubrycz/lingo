const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

const queries = require('../assets/queries');

router.get('/about', auth.isAuthenticated, async (req, res) => {
    console.log('route get /about: ');

    console.log(res.user.login);


    const userResult = await queries.findOneUserByLogin(res.user.login);
    console.log(userResult.login);

    const results = {
        login: userResult.login
    }

    if (res.user.login !== undefined) {
        res.send(results);
    } else if (res.user.login === undefined) {
        res.send('Not logged in');
    }
});


module.exports = router;