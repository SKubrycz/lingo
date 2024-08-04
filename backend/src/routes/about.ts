const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

const queries = require('../assets/queries');

router.get('/about', auth.isAuthenticated, async (req, res) => {
    console.log('route get /about: ');

    if (res.user !== undefined) {
        const userResult = await queries.findOneUserByLogin(res.user);
        console.log(userResult.login);

        const results = {
            login: userResult.login
        }

        res.status(200).send(results);
    } else if (res.user === undefined) {
        res.status(200).send('Not logged in');
    }
});


module.exports = router;