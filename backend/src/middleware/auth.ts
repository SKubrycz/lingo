const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    console.log(token);

    if (!token) return res.status(401).send('Nieautoryzowany');

    try {
        const userVerify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.user = userVerify;
        next();
    } catch (error) {
        res.status(401).send('Nieprawidłowy token');
    }
}

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    console.log('token: ' + token);

    if (token) {
        const userVerify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.user = userVerify;
        console.log(res.user);
        next();
    } else {
        next();
    }
}

module.exports = {
    checkAuth, isAuthenticated
}
