const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = '5c73fe17015762454e34ecf71';

if(!ObjectID.isValid(id)){
    console.log('Id is not valid');
};

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
}).catch((e) => {
    console.log(e);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todos', todo);
}).catch((e) => {
    console.log(e);
});

Todo.findById(id).then((todo) => {
    console.log('Todos', todo);
}).catch((e) => {
    console.log(e);
});