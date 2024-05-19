const express = require('express');
const router = express.Router();

require('dotenv').config();

const auth = require('../middleware/auth');

router.get('/lessons', auth.checkAuth, async (req, res) => {
    console.log('route get /lessons: ');
    
    res.send('Witamy w Lekcjach!');
});


module.exports = router;
