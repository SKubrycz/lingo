const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const queries = require('../assets/queries');

const auth = require('../middleware/auth');

router.get('/profile/:id', auth.isAuthenticated, async (req, res) => {
    try {
        const login = await req.params.id;

        console.log(`get in /profile/:id: ${login}`);

        const result = await queries.findOneUserByLogin(login) //!query later to be changed

        console.log(result.login);

        let sessionUser = false;
        if (res.user) sessionUser = true;

        const fetched = {
            id: result._id,
            login: result.login,
            sessionUser: sessionUser,
        }

        return res.status(200).send(fetched);
    } catch (error) {
        res.status(500).send(`Error /profile ${error}`);
    }
});

module.exports = router;
