const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/FoodFacilityDB',{ useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('Error in DB connection: '+err)
    }
});

require('./foodfacility.model')