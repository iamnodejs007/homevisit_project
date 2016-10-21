var mongoose= require ("mongoose");


var tourSchema = new mongoose.Schema ({
    
    name: String,
    city: String,
    neighborhood:String,
    host: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        
    },
    
    categories: Array,
    description: String,
    duration: Number,
    img:  String
    
});


module.exports = mongoose.model('Tour', tourSchema);


