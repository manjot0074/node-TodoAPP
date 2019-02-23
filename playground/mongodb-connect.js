const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error, db) => {
    if(error){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('MongoDb connected');
    // db.collection('Todos').insertOne({
    //     text: 'Walk the dog',
    //     completed: false
    // }, (error, result) => {
    //     if(error){
    //         return console.log('unable to insert todo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // });

    // db.collection('Users').insertOne({
    //     name: 'manjot2',
    //     age: '25',
    //     location: 'BGLR'
    // }, (err, result) => {
    //     if(error){
    //         return console.log('unable to insert todo', error);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });
    db.collection('Todos').find({
        completed: true
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err);
    });
    db.close();
});