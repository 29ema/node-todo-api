
var mongoose= require('mongoose');

var Todo= mongoose.model('Todo', {
    text: {
        type:String,
        require:true,
        minlength: 1,
        trim: ' '
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});


module.exports={Todo}