const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../models/User');

//@desc     timers/User's timer's
//@route    GET /timers
router.get('/timers', ensureAuth, (req, res) =>{
    res.render('timers')
})





module.exports = router

