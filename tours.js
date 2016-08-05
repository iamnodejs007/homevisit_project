var mongoose= require ("mongoose");
mongoose.connect("mongodb://localhost/tours");

var tourSchema = new mongoose.Schema ({
    
    name: String,
    city: String,
    neighborhood:String,
    description: String,
    duration: Number,
    image: String
    
    
    
});

var Tour = mongoose.Model ("Tour", tourSchema);


