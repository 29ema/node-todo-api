const {ObjectID}= require ('mongodb');
const {Todo}= require('./../../models/todo');
const {User}= require('./../../models/user');
const jwt= require('jsonwebtoken');


var userOneId= new ObjectID();
var userTwoId= new ObjectID();

var users=[{
    _id:userOneId,
    email: "emaema@google.com",
    password:'userOnePass',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userOneId.toHexString(), access:'auth'},process.env.JWT_SECRET).toString()
    }]
},{
    _id:userTwoId,
    email: "jen@google.com",
    password:'userTwoPass',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userTwoId.toHexString(), access:'auth'},process.env.JWT_SECRET).toString()
    }]
}];

const populateUsers=(done)=>{
    User.remove({}).then(()=>{
     var userOne=new User(users[0]).save();
     var userTwo=new User(users[1]).save();
     return Promise.all([userOne,userTwo]);
    }).then(()=>done());
};

const todos=[{
    _id: new ObjectID(),
    text: "first test",
    _creator:userOneId
},{
    _id: new ObjectID(),
    text: "second test",
    _creator:userTwoId
}];


const populateTodos=(done)=>{
    Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
    }).then(()=>done());
};

module.exports={todos, populateTodos,users,populateUsers};