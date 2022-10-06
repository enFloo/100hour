const mongoose = require('mongoose');
const Timer = require('../models/Timer');

module.exports = {
    createTimer: async (req, res) => {
        try{
            await Timer.create({
                id: req.params.id,
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
    },

    getTimer: async(req, res) =>{

        const timerData = await Timer.find({}).lean().exec();

        res.render('timers', {data: timerData})

    },

    showTimer: async(req, res) =>{
        const timerData = await Timer.find({}).lean().exec();
        const timerId = await Timer.findById(req.params.id).exec();

        res.render('showTimer', {data: timerData, id: timerId});

    
    },

}