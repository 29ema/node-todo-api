const {mongoose}= require ('./../server/db/mongoose');
const {ObjectID} =require('mongodb');

const {Todo}= require ('./../server/models/todo');
const {User}= require ('./../server/models/user');


// Todo.findByIdAndRemove("5b6c0d8867fc7a0edd05ff30").then((res)=>{
//     console.log(res);
// });

//returns null if id not found, returns the obj if found
//remove() only sends back the number of todos deleted