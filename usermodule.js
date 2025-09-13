const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/learning_multer');

const userschema=mongoose.Schema({
    name:String,
    image:{
        type:String,
        default:"default.png"
    }
});

module.exports=mongoose.model('users',userschema);