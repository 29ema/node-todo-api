const {MongoClient, ObjectID}= require ('mongodb');

// _id:new ObjectID('5b6aa61a298dc4167caa3419' //how to query by id


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err) {
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to the MongoDb server');

//    db.collection('Todos').find({_id:new ObjectID('5b6aa61a298dc4167caa3419')}).toArray()
//     .then((docs)=>{
//            console.log(JSON.stringify(docs,undefined,2));
//     },(err)=>{
//         console.log('Unable to fetch todos',err);
//     });

// db.collection('Todos').find().count()
// .then((count)=>{
//        console.log(`There are ${count} todo(s) in your 'Todo' collection`);
// },(err)=>{
//     console.log('Unable to fetch todos',err);
// });
    


db.collection('Users').find({name:'Ema'}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs,undefined,2));
}, (err)=>{
    console.log('Unable to fetch data',err);
});


    db.close();
});