const {MongoClient, ObjectID}= require ('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err) {
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to the MongoDb server');

//findOneandUpdate
//
var users= db.collection('Users');
var todos= db.collection('Todos');

// todos.findOneAndUpdate({_id: new ObjectID('5b6ab92805582ccfc16e6ba2')},
//     { $set:{
//         completed:true
       
//     }},{ returnOriginal:false})
//     .then(
//     (res)=>{
//         console.log(res);
//     },(err)=>{
//         console.log(err);
//     });

users.findOneAndUpdate({_id:new ObjectID('5b6aa8faac1cb537d4d3ff3e')},
    {$set:{
        name:'Ema',
    },
    $inc:{
        'age': 1
    }},{
        returnOriginal:false
    }).then((res)=>{
        console.log(res);
    })
    db.close();
});