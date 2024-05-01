const express = require('express');
const router = express.Router();

const runDB = require('../assets/db');

const queries = require('../assets/queries');

const hashData = require('../utilities/hashData');

router.post('/register', async (req, res) => {
    try {
        const { email, login, password, passwordAgain } = await req.body;

        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        const hash = await hashData(password);

        if (password === '' || !password) return res.status(404).send('Hasło niepoprawne');
        if (passwordAgain === '' || !passwordAgain) return res.status(404).send('Powtórzone hasło niepoprawne');
        if (regex.test(password) === false) return res.status(404).send('Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny');
        if (password === passwordAgain) {
            console.log(`posted in /register: ${email} ${login} ${password} ${passwordAgain}, ${hash}`);

            queries.insertOneUser(email, login, hash);

            return res.status(200).send('Zarejestrowano');
        } else {
            return res.status(404).send('Hasła nie są takie same');
        }

    } catch (error) {
        return res.status(500).send(`Error /register ${error}`);
    }
});

module.exports = router;
