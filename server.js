//INITIALIZE NPM MODULES

var express = require("express");
var mongoose= require ("mongoose");
var bodyParser = require ("body-parser");
var app = express();
var multer  = require('multer');
var Schema = mongoose.Schema;


//SET UP BODY PARSER

app.use (bodyParser.urlencoded ({extended: true}));
app.use(bodyParser.json());

//SETUP MULTER UPLAODS


app.use(multer({
    dest: 'public/uploads/',
    rename: function(fieldname, filename) {
      return filename + Date.now();
    },
    onFileUploadStart: function(file) {
      console.log(file.originalname + ' is starting...');
    },
    onFileUploadComplete: function(file, req, res) {
      console.log(file.fieldname + ' uploaded to ' + file.path);
      var fileimage = file.name;
      req.middlewareStorage = {
        fileimage: fileimage
      }
    }
  }));



//SET EXPRESS TO DELIVER STATIC ANGULAR FILES

app.use(express.static('public'));

//SET UP MONGO DB

// process.env.DATABASEURL ||"";
mongoose.connect("mongodb://localhost/tours");

var tourSchema = new Schema ({
    
    name: String,
    city: String,
    neighborhood:String,
    description: String,
    duration: Number,
    img:  String
  
    
    
    
});

//INITIATE MONGOOSE MODEL FOR TOURS

var Tour = mongoose.model ("Tour", tourSchema);

module.exports = mongoose.model('Tour', tourSchema);

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


//CREATE NEW TOUR

app.post('/tours', function(req, res) {
 
  var fileimage = req.middlewareStorage.fileimage 
  var tour = new Tour 
 ({
                      //need to add an email here 
                      name: req.body.name,
                      neighborhood: req.body.neighborhood,
                      city: req.body.city,
                      duration: req.body.duration,
                      description: req.body.description,
                      img: 'public/uploads/' + fileimage

                      
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



app.listen(process.env.PORT, process.env.IP, function ()  {
    console.log ("Server is listening!");
    });