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

    updateTimer: async (req, res) => {
        try{
            let updateId = req.params.id;
            let updateTimerName = req.body.timerName;
            let updateActiveTime = req.body.activeTime;
            let updatebreakTime = req.body.breakTime;
            let updateNumberOfRounds = req.body.numberOfRounds;
            
            const timer = await Timer.findByIdAndUpdate({updateId: req.params.id}, {$set:{timerName: updateTimerName, activeTime: updateActiveTime, breakTime: updatebreakTime, numberOfRounds: updateNumberOfRounds}},
                {new:true},(err, data) =>{
                    if(data == null){
                        alert('nothing has been updated hoe')
                    }else{
                        res.send(data);
                    }
                }
            );

            console.log('hello');
            res.render('dashboard')


        }catch(err){
            console.log(err);
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