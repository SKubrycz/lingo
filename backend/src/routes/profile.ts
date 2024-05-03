const express = require('express');
const router = express.Router();

const queries = require('../assets/queries');

router.get('/profile/:id', async (req, res) => {
    try {
        const login = await req.params.id;

        console.log(`get in /profile/:id: ${login}`);


        const result = await queries.findOneUser(login); //!query later to be changed

        console.log(result.login);

        const fetched = {
            id: result._id,
            login: result.login,
        }

        return res.status(200).send(fetched);
    } catch (error) {
        res.status(500).send(`Error /login ${error}`);
    }
});

module.exports = router;
