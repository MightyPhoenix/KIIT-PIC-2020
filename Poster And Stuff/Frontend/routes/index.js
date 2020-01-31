var express = require('express');
var router = express.Router();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


//LOCAL STRATEGY PASSPORT

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
        return done(null,false,{message : 'Invalid password'})
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

function loggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}
function loggedOut(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/dashboard');
  }
}

//LOCAL STRATEGY ENDS


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home |' });
});

router.get('/login',function (req,res,next) {
  res.render('login',{});
});



module.exports = router;
