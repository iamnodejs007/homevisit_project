var express = require('express');
var router = express.Router();
var Tour = require ('../models/tours');
var bodyParser = require ("body-parser");
var cloudinary = require ('cloudinary');
var multer  = require('multer');



router.use (bodyParser.urlencoded ({extended: true}));
router.use(bodyParser.json());


router.use(multer({
    dest: 'public/uploads/',
    
  }));

//SET UP  RESTFUL ROUTES


//READ ALL TOURS

router.get('/tours', function(req, res, next) {
  Tour.find(function (err, tours) {
    if (err) return next(err);
    res.json(tours);
  });
});

router.get('/tours/:id', function(req, res, next) {
  Tour.findById({_id: req.params.id}, function (err, foundTour) {
    if (err) 
      console.log (err);
    else
     res.json( foundTour);
    
    });
});


//CREATE NEW TOUR with CLOUDINARY

router.post('/tours', function(req, res) {
 
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
});









//READ SINGLE TOUR

router.get('tours/:id', function (req, res) {
  Tour.findById(req.params.id, function(err, tour){
    if(err) res.send(err);
    else
    res.json(tour);
  });
});


//UPDATE SINGLE TOUR

router.put("/tours/:id", function(req, res){
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

router.delete("/tours/:id", function(req, res){
  Tour.findByIdAndRemove(req.params.id, function(err, tours){
      if(err){
          console.log(err);
      } else
      res.sendStatus(204);
      console.log ("record removed!");
      
  }); 
});



module.exports = router;