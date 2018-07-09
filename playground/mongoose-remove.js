const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


//Todo.remove({}).then((result) => {
//    console.log(result);

//});

//Todo.findOneAndRemove({ _id: '5b3cd3578cb0fb8734d738d7' }).then((todo) => {
//});

Todo.findByIdAndRemove('5b3cd3578cb0fb8734d738d7').then((todo) => {
    console.log(todo);
});