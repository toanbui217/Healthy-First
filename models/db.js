const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/FoodFacilityDB',{ useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('Error in DB connection: '+err)
    }else{
        console.log('MongoDB Connection');
    }
});

require('./foodfacility.model')
//require('./certification.model')
//Sercure: chỉ dc cookie dc gửi khi dùng https .,
//httponly : trinh duyet ko dc dug javascipt de dung .
//state luu tai client 