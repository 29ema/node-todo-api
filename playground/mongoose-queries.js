const {mongoose}= require ('./../server/db/mongoose');
const {Todo}= require ('./../server/models/todo');
const {User}= require ('./../server/models/user');
const {ObjectID} =require('mongodb');

var id= "5b6adea02ad7a42a50f2ef1e";

if(!ObjectID.isValid(id)){
    console.log('The id entered is not valid !')
}

// Todo.find({_id: id}).then((todos)=>{console.log('Todos ', todos);});

// Todo.findOne().then((todo)=>{
//     console.log('Todo ', todo)
// });
// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found')
//     }
//     console.log('Todo by ID ', todo)
// }).catch((e)=>{console.log(e)});


User.findById(id).then((user)=>{
    if(!user){
        return console.log('Id not found')
    }
    console.log('User by ID ', JSON.stringify(user,undefined,2))
}).catch((e)=>{console.log(e)});
