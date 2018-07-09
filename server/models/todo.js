//mongoose model created below

var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim:true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = { Todo };

////krijuam nje object
//var newTodo = new Todo({
//    text: 'Something to do'
//});