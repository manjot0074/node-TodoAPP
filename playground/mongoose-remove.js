const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');


Todo.remove({}).then((result) => {
    console.log(result);
});

Todo.findOneAndDelete({ _id : '5c73fe17015762454e34ecf71'}).then((result)=> {
    console.log(result);
});