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
//@route    GET /timers/:id
router.get('/timers/:id', ensureAuth, timersController.getTimer);

//@desc     Edit a single Timer
//@route    GET /timers/:id/edit
router.get('/timers/:id/edit', ensureAuth, timersController.editTimer);

//@desc     Update a single Timer
//@route    PUT /timers/:id
router.put('/timers/:id', timersController.updateTimer)

//@desc     Delete a single Timer
//@route    Delete /timers/:id
router.delete('/timers/:id', timersController.deleteTimer)


module.exports = router 

