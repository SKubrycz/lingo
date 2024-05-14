const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

require('./assets/db');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const lessonsRoute = require('./routes/lessons');
const logoutRoute = require('./routes/logout');

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(cookieParser());

app.use(registerRoute);
app.use(loginRoute);
app.use(profileRoute)
app.use(lessonsRoute);
app.use(logoutRoute);



app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
