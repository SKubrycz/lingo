const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

const queries = require('../assets/queries');

router.get('/lessons', auth.checkAuth, async (req, res) => {
    console.log('route get /lessons: ');


    const result = await queries.findLessons();
    
    res.send(result);
});


module.exports = router;
