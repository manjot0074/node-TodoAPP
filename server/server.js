require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send({e :'Id is not valid'});
    };

    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send({e :'Id not found'});
        }
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        res.status(404).send({e :'Id is not valid'});
    };

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    };
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            res.status(404).send({e :'Id not found'});
        }
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send({e :'Id is not valid'});
    };

    Todo.findOneAndRemove({_id : id}).then((todo) => {
        if(!todo){
            res.status(404).send({e :'Id not found'});
        }
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
    var body =  _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((userDoc) => {
        res.send(userDoc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, ()=>{
    console.log('port started');
});
