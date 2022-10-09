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

        try{
            const timerData = await Timer.find({}).lean().exec();

            res.render('timers', {data: timerData})

        }catch(err){

            console.log(err);
        }
    },

    showTimer: async(req, res) =>{

        try{
            const timerlist = await Timer.find({}).lean().exec();

            const timerById = await Timer.findById(req.params.id).exec();

            res.render('showTimer', {timerData: timerById});

        }catch(err){
            console.log(err);
        }
        

        
    },

}