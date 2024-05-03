const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const runDB = require('./assets/db');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(registerRoute);
app.use(loginRoute);
app.use(profileRoute)


app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
