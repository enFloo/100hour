const mongoose = require('mongoose')

const TimerSchema = new mongoose.Schema({
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
    },
    user: {
        type: String,
        ref: "User"
    }
})

module.exports = mongoose.model('Timer', TimerSchema)
