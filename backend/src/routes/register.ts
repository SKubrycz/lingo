const express = require('express');
const router = express.Router();

const queries = require('../assets/queries');

const hashData = require('../utilities/hashData');

router.post('/register', async (req, res) => {
    try {
        const { email, login, password, passwordAgain } = await req.body;

        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        const hash = await hashData(password);

        if ((email === '' || !email) || (login === '' || !login)) return res.status(422).send('Należy wypełnić wszystkie pola formularza');

        const findUserQuery = await queries.findOneUser(email, login);
        console.log(findUserQuery);
        if (findUserQuery) return res.status(422).send('Użytkownik już istnieje');
        if (login.length <= 3) return res.status(422).send('Nazwa użytkownika musi być dłuższa niż 3 znaki');

        if (password === '' || !password) return res.status(422).send('Hasło niepoprawne');
        if (passwordAgain === '' || !passwordAgain) return res.status(422).send('Powtórzone hasło niepoprawne');
        if (regex.test(password) === false) return res.status(422).send('Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny');
        if (password === passwordAgain) {
            console.log(`posted in /register: ${email} ${login} ${password} ${passwordAgain}, ${hash}`);

            queries.insertOneUser(email, login, hash);

            return res.status(200).send('Zarejestrowano');
        } else {
            return res.status(400).send('Hasła nie są takie same');
        }

    } catch (error) {
        return res.status(500).send(`Error /register ${error}`);
    }
});

export default router;
