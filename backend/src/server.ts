const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

require('./assets/db');

const auth = require('./middleware/auth');

const homeRoute = require('./routes/home');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const lessonsRoute = require('./routes/lessons');
const logoutRoute = require('./routes/logout');
const aboutRoute = require('./routes/about');

const originDomain = 'http://localhost:3000';

const routesArray = [
    homeRoute, registerRoute, loginRoute, profileRoute, lessonsRoute, logoutRoute, aboutRoute,
];

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', `script-src 'self' ${originDomain}`);
    return next();
});

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: originDomain,
    credentials: true,
}));

app.use(cookieParser());

app.use(routesArray);

app.all('*', auth.isAuthenticated, (req, res) => {
    res.status(404).send('Błąd 404: Nie znaleziono zawartości');
})

app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
