// Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//Models



//Routes


//localStrategy passport

passport.use(new localStrategy(function(username,password,done){

    User.getUserByUsername(username,function(err,user){
        if(err) throw err;
        if(!user){
            return done(null,false,{message : 'Unknown User'});

        }

        User.comparedPassword(password,user.password,function(err,isMatch){
            if(err) throw err;
            if(isMatch){


                return done(null,user);

            }
            else{
                return done(null,false,{message : 'Invalid passpword'})
            }
        });
    });
}));
passport.serializeUser(function(user, done) {

    console.log('userId: '+user._id);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',passport.authenticate('local',
    { successRedirect: '/users/dashboard',
        failureRedirect: '/login',
        failureFlash : true }),
    function(req,res){
        res.redirect('/users/dashboard');
    });