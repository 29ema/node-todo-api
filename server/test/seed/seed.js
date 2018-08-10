const {ObjectID}= require ('mongodb');
const {Todo}= require('./../../models/todo');
const {User}= require('./../../models/user');
const jwt= require('jsonwebtoken');


var userOneId= new ObjectID();
var userTwoId= new ObjectID();

const users=[{
    _id:userOneId,
    email: "emaema@google.com",
    password:'userOnePass',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userOneId.toHexString(), access:'auth'},'abc123').toString()
    }]
},{
    _id:userTwoId,
    email: "jen@google.com",
    password:'userTwoPass'
    
}];
const populateUsers=(done)=>{
    User.remove({}).then(()=>{
     var userOne=new User(users[0]).save();
     var userTwo=new User(users[1]).save();
     return Promise.all([userOne,userTwo]);
    }).then(()=>done());
};

//--------------------------------------------------------------------------------------------
const todos=[{
    _id: new ObjectID(),
    text: "first test"
},{
    text: "second test",
    // completed:true,
    // completedAt: 123
}];


const populateTodos=(done)=>{
    Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
    }).then(()=>done());
};

module.exports={todos, populateTodos,users,populateUsers};