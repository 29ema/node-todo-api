const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');

    }
    console.log('Connected to MongoDB server');
    
    // delete many9
    //db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
    //    console.log(result);
    //});


    //delete one
    //db.collection('Todos').deleteOne({ text: 'Something to do' }).then((result) => {
    //    console.log(result);
    //});

    //find one and delete
    //kap te paren qe gjen si funksion
    db.collection('Todos').findOneAndDelete({ completed: true}).then((result) => {
       console.log(result);
    });



    //// db.close(); 
 
});