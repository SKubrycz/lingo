const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

const queries = require('../assets/queries');

router.get('/lessons', auth.checkAuth, async (req, res) => {
    console.log('route get /lessons: ');

    const result = await queries.findLessons();

    const userResult = await queries.findOneUserByLogin(req.login);
    console.log(userResult.login);

    const results = {
        result: result,
        login: userResult.login
    }
    
    res.send(results);
});


export default router;