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

    res.json(200);
});


app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));