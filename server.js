//INITIALIZE NPM MODULES

var express = require("express");
var mongoose= require ("mongoose");
var bodyParser = require ("body-parser");
var app = express();
var multer  = require('multer');
var cloudinary = require ('cloudinary');
var passport = require('passport');
var LocalStrategy = require ('passport-local');
var User = require('./server/models/user');
var Tour = require('./server/models/tours');
var Schema = mongoose.Schema;

//Set Up Passport

app.use(require('express-session')({
  secret: "hometours rocks!",
  resave: false,
  saveUninitialized: false
  
}));

app.use(passport.initialize());
app.use (passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//SET UP BODY PARSER

app.use (bodyParser.urlencoded ({extended: true}));
app.use(bodyParser.json());

//SETUP MULTER IMAGE UPLOADS

app.use(multer({
    dest: 'public/uploads/',
    
  }));


//SET UP CLOUDINARY STORAGE ---create environment variable here later
cloudinary.config(process.env.CLOUDINARY_URL);


//SET EXPRESS TO DELIVER STATIC ANGULAR FILES

app.use(express.static('public'));

//CONNECT MONGO DB FOR DEV AND PRODUCTION/HEROKU ENVIRONMENTS


mongoose.connect(process.env.DATABASEURL);


//SET UP  RESTFUL ROUTES


//READ ALL TOURS

app.get('/tours', function(req, res, next) {
  Tour.find(function (err, tours) {
    if (err) return next(err);
    res.json(tours);
  });
});

app.get('/tours/:id', function(req, res, next) {
  Tour.findById({_id: req.params.id}, function (err, foundTour) {
    if (err) 
      console.log (err);
    else
     res.json( foundTour);
    
    });
});


//CREATE NEW TOUR with CLOUDINARY

app.post('/tours', function(req, res) {
 
  // var fileimage = req.middlewareStorage.fileimage; 
 
  cloudinary.uploader.upload(
  req.files.file.path,
  function(result) { console.log(result);
  console.log('***************************');
  console.log(result.secure_url);
  

  
  
  var tour = new Tour 
({
                      //need to add an email here 
                      name: req.body.name,
                      neighborhood: req.body.neighborhood,
                      host:req.body.host,
                      categories: req.body.categories,
                      city: req.body.city,
                      duration: req.body.duration,
                      description: req.body.description,
                      img: result.secure_url
                    
                      
                    });


    tour.save(function(err,resp) {
        if(err) {
            console.log(err);
            res.send({
                message :'something went wrong'
            });
        } else {
            res.send({
                message:'the tour has bees saved'
            });
        }           

    });
    
  });
})









//READ SINGLE TOUR

app.get('tours/:id', function (req, res) {
  Tour.findById(req.params.id, function(err, tour){
    if(err) res.send(err);
    else
    res.json(tour);
  });
});


//UPDATE SINGLE TOUR

app.put("/tours/:id", function(req, res){
  Tour.findByIdAndUpdate(req.params.id, req.body, function(err, tours){
      if(err){
          console.log (err);
      } 
        else
        res.json(tours);
      }
  );
});

//DELETE SINGLE TOUR

app.delete("/tours/:id", function(req, res){
  Tour.findByIdAndRemove(req.params.id, function(err, tours){
      if(err){
          console.log(err);
      } else
      res.sendStatus(204);
      console.log ("record removed!");
      
  }); 
});


//AUTH ROUTES

app.post("/register", function(req, res) {
  var newUser =  new User({username: req.body.username});
  User.register(newUser, req.body.password, function (err,user) {
    if(err) {
      return res.status(500).json({
        err: err});

    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });

    });
  });
 });
 
app.post('/login', function(req, res, next) {
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
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

 
app.get('/logout', function(req, res) {
      req.logout();
      res.status(200).json({
      status: 'Bye!'
  });
  
});

app.get('/status', function(req, res) {
  
      if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});





app.listen(process.env.PORT, process.env.IP, function ()  {
    console.log ("Server is listening!");
    });