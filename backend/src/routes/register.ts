const express = require('express');
const router = express.Router();

const runDB = require('../assets/db');

const hashData = require('../utilities/hashData');

router.post('/register', async (req, res) => {
    try {
        const { email, login, password, passwordAgain } = await req.body;

        const hash = await hashData(password);

        if (password === '' || !password) return res.status(404).send('Hasło niepoprawne');
        if (passwordAgain === '' || !passwordAgain) return res.status(404).send('Powtórzone hasło niepoprawne');
        if (password === passwordAgain) {
            console.log(`posted in /register: ${email} ${login} ${password} ${passwordAgain}, ${hash}`);

            const client = await runDB();
            
            try {
                const db = await client.db("language-app");

                const usersCollection = db.collection('users');
                const result = await usersCollection.insertOne({
                    'email': email,
                    'login': login,
                    'password': hash,
                });
                console.log(result);
            } finally {
                client.close();
            }



            return res.status(200).send('Zarejestrowano');
        } else {
            return res.status(404).send('Hasła nie są takie same');
        }

    } catch (error) {
        return res.status(500).send(`Error /register ${error}`);
    }
});

module.exports = router;
