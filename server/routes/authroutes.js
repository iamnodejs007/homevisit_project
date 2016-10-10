var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var bodyParser = require ("body-parser");



router.use(require('express-session')({
  secret: "hometours rocks!",
  resave: false,
  saveUninitialized: false
  
}));



router.use(passport.initialize());
router.use (passport.session());
router.use (bodyParser.urlencoded ({extended: true}));
router.use(bodyParser.json());



//REGISTER A NEW USER

router.post('/register', function(req, res) {
   User.register(new User({ username: req.body.username }), req.body.password, function (err,user) {
    if(err) {
      return res.status(500).json({
        err: err});

    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!',
    });

    });
  });
 });
 

 //LOGIN AS AN EXISITING USER
 
 
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!',
        user: req.user.username
      });
    });
  })(req, res, next);
});

 
 
 //LOGOUT PROCESS
 
router.get('/logout', function(req, res) {
      req.logout();
      res.status(200).json({
      status: 'Bye!'
  });
  
});


//CHECK IF LOGGEG IN FR PERSISTANT SESSIONS

router.get('/status', function(req, res) {
  
      if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});




module.exports = router;