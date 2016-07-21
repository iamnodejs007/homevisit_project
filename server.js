//Initialize npm packages

var express = require("express");
var mongoose= require ("mongoose");
var bodyParser = require ("body-parser");
var app = express();
// var router  = express.Router ();
var Schema = mongoose.Schema;



app.use (bodyParser.urlencoded ({extended: true}));
app.use(bodyParser.json());

//SET STATIC FOLDER


app.use(express.static('public'));

//SET UP MONGO DB


mongoose.connect("mongodb://localhost/tours");

var tourSchema = new Schema ({
    
    name: String,
    city: String,
    neighborhood:String,
    description: String,
    duration: Number,
    image: String
    
    
    
});


var Tour = mongoose.model ("Tour", tourSchema);

module.exports = mongoose.model('Tour', tourSchema);

//SET UP  RESTFUL ROUTES

//Get All tours

app.get('/tours', function(req, res, next) {
  Tour.find(function (err, tours) {
    if (err) return next(err);
    res.json(tours);
  });
});

app.get('/tours/:id', function(req, res, next) {
  Tour.findByID(function (err, tours) {
    if (err) return next(err);
    res.json(tours);
  });
});


//Post A New Tour to Database

app.post('/tours', function(req, res) {
  
  var tour = new Tour({
                      //need to add an email here 
                      name: req.body.name,
                      neighborhood: req.body.neighborhood,
                      city: req.body.city,
                      duration: req.body.duration,
                      image:req.body.image,
                      
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



// //GET TOUR DATA FROM DATABASE AND SHOW IT TO READER



//show single tour

app.get('tours/:id', function (req, res) {
  Tour.findById(req.params.id, function(err, tour){
    if(err) res.send(err);
    else
    res.json(tour);
  });
});


// //SUBMIT A NEW DATA ENTRY, A NEW TOUR 



// app.post ("/tours/new", function (req,res) {
//     var name = req.body.name; 
//     var city = req.body.city;
//     var neighborhood = req.body.neighborhood;
//     var description = req.body.description;
//     var duration = req.body.duration;
//     var image= req.body.image;
    
//     var newTour = {name:name, city:city, neigborhood:neighborhood, description:description, duration:duration, image:image}

//     Tour.create(newTour, function (err, newlyCreated) {
//               if (err) {
//             console.log ("There was an error in creating the tour")
//         } else
//         res.redirect ("/tours");
//     });
//     }
    
    
    
    
 

// //UPDATE TOUR DATA BY ADDING A COMMENT

// app.post



// //DELETE 










app.listen(process.env.PORT, process.env.IP, function ()  {
    console.log ("Server is listening!");
    });