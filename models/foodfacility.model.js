const mongoose=require('mongoose');
var foodfacilitySchema=new mongoose.Schema({
    fullname:{
        type:String,
        required: 'This field is required.'
    },
    address: {
        type:String 
    },
    town: {
        type : String
    },
    district: {
       type : String
    },
    phone_number :{
        type : String
    },
    business_type: {
        type : String
    },
    certification_number: {
        type: String
    }
});
mongoose.model('FoodFacility',foodfacilitySchema);