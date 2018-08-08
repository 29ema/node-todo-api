const {MongoClient, ObjectID}= require ('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err) {
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to the MongoDb server');

// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((res)=>{
//     console.log(`${res.result.n} todo(s) were deleted.`);
// });

// db.collection('Todos').findOneAndDelete({text: 'Eat Lunch'}).then((res)=>{
//     console.log(res);
// })


// findOneandDelete is better as it returns to you the deleted objects

// db.collection('Users').deleteOne({_id : new ObjectID('5b6aa86f7678801e5850de10')}).then(
//     (res)=>{
//         console.log(`${res.result.n} user(s) were deleted.`);

// }, (err)=>{
//     console.log('Unable to delete the user');
// })

db.collection('Users').deleteMany({name:'Ema'}).then(
    (res)=>{
        console.log(`${res.result.n} user(s) were deleted.`);
    },
    (err)=>{
        console.log('Unable to delete users');
    }
)


    db.close();
});