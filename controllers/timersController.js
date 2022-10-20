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
            
            console.log(err)
        }
    },

    updateTimer: async (req, res) => {
        try{
            //check if active and break time user input is a number
            if(isNaN(parseFloat(req.body.activeTime.replace(/:/g, ""))) || isNaN(parseFloat(req.body.breakTime.replace(/:/g, "")))){
                //will need to come back to this
                exit 
            }
            else{
                req.body.activeTime = parseFloat(req.body.activeTime.replace(/:/g, ""))
                req.body.breakTime = parseFloat(req.body.breakTime.replace(/:/g, ""))
            }
            
            let updateId = req.params.id;
            let updateTimerName = req.body.timerName;
            let updateActiveTime = req.body.activeTime;
            let updatebreakTime = req.body.breakTime;
            let updateNumberOfRounds = req.body.numberOfRounds;
            
            await Timer.findOneAndUpdate(
            {updateId: req.params.id}, {$set:{timerName: updateTimerName, activeTime: updateActiveTime, breakTime: updatebreakTime, numberOfRounds: updateNumberOfRounds}}).lean().exec();

                    
            console.log('Timer has been edited!')
            res.redirect(`/timers/${req.params.id}`)
            

        }catch(err){
            console.log(err);
        }

    },

    deleteTimer: async (req, res) =>{   
        try{
            let timer = Timer.findById({_id: req.params.id});

            await Timer.remove({_id: req.params.id});
            console.log('Timer deleted');
            res.redirect('/timers');
        }catch(err){
            res.redirect('/timers');
        }

    },

    createTimer: async (req, res) => {

        try{
            if(isNaN(parseFloat(req.body.activeTime.replace(/:/g, ""))) || isNaN(parseFloat(req.body.breakTime.replace(/:/g, "")))){
                //will need to come back to this
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