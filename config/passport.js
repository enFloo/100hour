const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) =>{
        const newUser = {
            id: profile.id,
            displayName: profile.displayName,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            photos: profile.photos[0].value
        }

        try{
            let user = await User.findOne({id: profile.id})

            if(user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null,user)
            }

        }
        catch(err){

            console.error(err)
        }
        
    }))
    

    passport.serializeUser((user, cb) => {
        process.nextTick(function() {
          return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
          });
        });
    });
      
    passport.deserializeUser((user, cb) => {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
}