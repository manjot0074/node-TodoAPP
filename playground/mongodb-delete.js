const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error, db) => {
    if(error){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('MongoDb connected');
    // db.collection('Todos').deleteMany({
    //     text : 'eat lunch'
    // }).then((result) =>{
    //    console.log(result) 
    // });

    // db.collection('Todos').deleteOne({
    //     text : 'eat lunch'
    // }).then((result) =>{
    //    console.log(result); 
    // });

    db.collection('Todos').findOneAndDelete({
        text : 'eat lunch'
    }).then((result) =>{
       console.log(result); 
    });

});