const mongoose = require('mongoose')

const TimerSchema = new mongoose.Schema({
    timerName:{
        type: String,
        required: true
    },
    activeTime:{
        type: String,
        required: true
    },
    breakTime:{
        type: String,
        required: true
    },
    numberOfRounds:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Timer', TimerSchema) 