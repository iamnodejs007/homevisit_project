//INITIALIZE NPM MODULES

var express = require("express");
var mongoose= require ("mongoose");
var app = express();
var cloudinary = require ('cloudinary');
var passport = require('passport');
var LocalStrategy = require ('passport-local');
var User = require('./server/models/user');

//ROUTES

var authRoutes = require('./server/routes/authroutes');
var tourRoutes = require('./server/routes/tourroutes');



//SET UP EXPRESS ROUTER

app.use(authRoutes);
app.use(tourRoutes);


//SETUP PASSPORT AUTHENTICATION


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//SET UP CLOUDINARY REMOTE IMAGE UPLOAD STORAGE 


cloudinary.config(process.env.CLOUDINARY_URL);


//SET EXPRESS TO DELIVER STATIC ANGULAR FILES

app.use(express.static('public'));

//CONNECT MONGO DB FOR DEV AND PRODUCTION/HEROKU ENVIRONMENTS

mongoose.connect(process.env.DATABASEURL);



app.listen(process.env.PORT, process.env.IP, function ()  {
    console.log ("Server is listening!");
    });