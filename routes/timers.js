const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../models/User');
const timersController = require('../controllers/timers');
const Timer = require('../models/Timer');


//@desc     timers/User's timer's
//@route    GET /timers
router.get('/timers', ensureAuth, timersController.getTimer,(req, res) =>{
    res.render('timers')
});

//@desc     create Time
//@route    POST /timers
router.post('/timers', ensureAuth, timersController.createTimer);





module.exports = router

