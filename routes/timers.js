const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../models/User');
const timersController = require('../controllers/timersController');
const Timer = require('../models/Timer');


//@desc     Show all of the user's timers
//@route    GET /timers
router.get('/timers', ensureAuth, timersController.getTimers);

//@desc     Create a new timer
//@route    POST /timers
router.post('/timers', ensureAuth, timersController.createTimer);


//@desc     Get a single Timer
//@route    GET /showTimer/:id
router.get('/timers/:id', ensureAuth, timersController.getTimer);

//@desc     edit Timer
//@route    GET /timer/:id
router.get('/timer/:id/edit', ensureAuth);


module.exports = router

