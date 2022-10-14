const mongoose = require('mongoose');
const Timer = require('../models/Timer');

module.exports = {

    getTimers: async (req, res) => {
        try {
            const collection = await Timer.find({}).lean().exec();

            console.log(collection)
            res.render('timers', {timers: collection})
            
        } catch (err) {
            console.log(err)
        }
    },

    getTimer: async(req, res) =>{

        try{
            const timerById = await Timer.findById(req.params.id).lean().exec();
        
            console.log(timerById)
            res.render('showTimer', {timer: timerById});

        }catch(err){
            console.log(err);
        }
    },

    createTimer: async (req, res) => {

        // convert req.body.activeTime to Number type
        // convert req.body.breakTime to Number type

        /// ... 

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


}