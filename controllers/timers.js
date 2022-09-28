const mongoose = require('mongoose');
const Timer = require('../models/Timer');

module.exports = {
    createTimer: async (req, res) => {
        try{
            await Timer.create({
                id: req.body.id,
                timerName: req.body.timerName,
                activeTime: req.body.activeTime,
                breakTime: req.body.breakTime,
                numberOfRounds: req.body.numberOfRounds
            });
            console.log("Timer has been created!");
            res.redirect('/timers')

        } catch(err) {
            console.log(err);
        }
    }
}