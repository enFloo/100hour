const mongoose = require('mongoose')

const TimerSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    timerName:{
        type: String,
        required: true
    },
    activeTime:{
        type: Number,
        required: true
    },
    breakTime:{
        type: Number,
        required: true
    },
    numberOfRounds:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Timer', TimerSchema) 