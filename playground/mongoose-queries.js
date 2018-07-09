const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');



var id = '5b3b6b0cbf6fad130c6928ce';

//if (!ObjectID.isValid(id)) {
//    console.log('ID not valid');
//}

//Todo.find({
//    _id: id  //mongoose turns the string into a query id and then makes the query
//}).then((todos) => {
//    console.log('Todos', todos);

//    });

////find returns an array, when findOne only returns an object

//Todo.findOne({
//    _id: id  
//}).then((todo) => {
//    console.log('Todos', todo);

//    });

//Todo.findById(id).then((todo) => {
//    if (!todo) {
//        return console.log('Id not found');
//    }
//    console.log('Todo By Id', todo);

//}).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log('User By Id', user);

}).catch((e) => console.log(e));
