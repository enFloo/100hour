const mongoose = require('mongoose');
const Timer = require('../models/Timer');

module.exports = {

    getTimers: async (req, res) => {
        try {
            const collection = await Timer.find({}).lean().exec();

            //console.log(collection)
            res.render('timers', {timers: collection})
            
        } catch (err) {
            console.log(err)
        }
    },

    getTimer: async(req, res) =>{

        try{
            const timerById = await Timer.findById(req.params.id).lean().exec();
        
            //console.log(timerById)
            res.render('showTimer', {timer: timerById});

        }catch(err){
            console.log(err);
        }
    },

    editTimer: async (req, res) =>{
        try{
            const timer = await Timer.findById(req.params.id).lean().exec();
            res.render('editTimer', {timer: timer});
        }catch(err) {
            console.log('Timer has been edited!')
            console.log(err)
        }
    },

    createTimer: async (req, res) => {

        try{
            if(isNaN(parseFloat(req.body.activeTime.replace(/:/g, ""))) || isNaN(parseFloat(req.body.breakTime.replace(/:/g, "")))){
                exit 
            }
            else{
                req.body.activeTime = parseFloat(req.body.activeTime.replace(/:/g, ""))
                req.body.breakTime = parseFloat(req.body.breakTime.replace(/:/g, ""))
            }
            
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