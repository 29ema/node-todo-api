var mongoose= require('mongoose');

var User=mongoose.model('User',{
    email:{
        type:String,
        require:true,
        trim: ' ',
        minlength:1
    }
});


module.exports={User}