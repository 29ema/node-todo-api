const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //find one and update
    //
    //db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5b3b2e14dda0a141f45e3415') }, {
    //    $set: {
    //        completed: false
    //    }
    //}, {
    //        returnOriginal: false
    //    }).then((result) => {
    //        console.log(result);
    //    });



    //update one and inc
    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5b3a4398f32c11032c92576d') }, {
        $set: {
            name: 'Emma'
        },
        $inc: {
            age: +1
        }
    }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });


    // db.close(); 
});