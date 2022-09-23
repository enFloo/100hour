const express = require('express');
const router = express.Router();
const passport = require('passport');


//@desc     Authenticate with Google
//@route    GET /auth/google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}))

//@desc     Google auth callback
//@route    Get /auth/google/callback
router.get('auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard')
})


module.exports = router

 