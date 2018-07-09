//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);
//var user = { name: 'andrew', age: 25 };
//var { name } = user;
//console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');

    }
    console.log('Connected to MongoDB server');


    //db.collection('Todos').insertOne({
    //    text: 'Something to do',
    //    completed: false
    //}, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert todo', err);
    //    }
    //    console.log(JSON.stringify(result.ops, undefined, 2));

    //});

//    db.collection('Users').insertOne({
        
//        name: 'Ema',
//        age: 22,
//        location: 'Tirana'
//    }, (err, result) => {
//        if (err) {
//            return console.log('Unable to insert user', err);
//        }
//        console.log(result.ops);

    
//});

    //Insert new doc into Users collection (name, age,location)
       db.close(); //closes the connection to the db
});

