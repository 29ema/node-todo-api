const {MongoClient}= require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err) {
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to the MongoDb server');

    // db.collection('Todos').insertOne(
    //     {
    //         text:'My first todo', 
    //         completed: false
    //     },
    //     (err,result)=>{
    //         if(err){
    //             return console.log('Insertion failed');
    //         }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    //     }
    // );

    //Insert new doc into Users, (mane,age,location)
    db.collection('Users').insertOne({
        name:'Ema',
        age:22,
        location: 'Tirana'
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert new user data');
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    
    db.close();
});