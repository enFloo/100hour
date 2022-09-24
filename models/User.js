const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    givenName:{
        type: String,
        required: true
    },
    familyName:{
        type: String,
        required: true
    },
    photos:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema) 