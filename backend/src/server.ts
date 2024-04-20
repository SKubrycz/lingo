const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: true,
    credentials: true,
}));

app.post('/login', (req, res) => {
    const { login, password } = req.body;

    console.log(`posted in /login: ${login}, ${password}`);

    res.status(200).send('Logged in');
});

app.post('/register', (req, res) => {
    const { email, login, password, passwordAgain } = req.body;

    console.log(`posted in /register: ${email} ${login} ${password} ${passwordAgain}`);
    res.status(200).send('Registered')
});


app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
