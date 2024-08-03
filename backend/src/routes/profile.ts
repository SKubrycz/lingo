import { ObjectId } from "mongodb";

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const queries = require('../assets/queries');

const auth = require('../middleware/auth');


interface FindUser {
    _id: ObjectId;
    login: string;
    createdDate: Date;
}

interface SentUser {
    id: ObjectId;
    login: string;
    createdDate: string; // parsed
    sessionUser: boolean;
}

router.get('/profile', auth.isAuthenticated, async (req, res) => {
    try {

        console.log('/profile');
        /* console.log('res.user:' + res.user.login);
        
        const result = await queries.findOneUserByLogin(res.user.login);

        let sessionUser = false;
        if (res.user) sessionUser = true;

        const fetched = {
            id: result._id,
            login: result.login,
            sessionUser: sessionUser,
        } */

        return res.status(200).send('Not found');

    } catch (error) {
        res.status(500).send(`Error /profile ${error}`);
    }
})

router.get('/profile/:id', auth.isAuthenticated, async (req, res) => {
    try {
        const login = await req.params.id;

        console.log(`get in /profile/:id: ${login}`);

        const result: FindUser = await queries.findOneUserByLogin(login);

        console.log(result.login);

        let sessionUser = false;
        if (res.user.login === login) sessionUser = true;

        const parseDate: string = result.createdDate.toLocaleDateString();

        const fetched: SentUser = {
            id: result._id,
            login: result.login,
            createdDate: parseDate,
            sessionUser: sessionUser,
        }

        return res.status(200).send(fetched);
    } catch (error) {
        res.status(500).send(`Error /profile/:id ${error}`);
    }
});

module.exports = router;