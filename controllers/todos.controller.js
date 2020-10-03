const Todos = require('../models/todo.model');
const { validationResult } = require('express-validator');

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Todos({
        userId: req.params.id,
        title: req.body.title,
        description: req.body.description,
        marked_date: req.body.marked_date
    }).save((err, todo) => {
        if (err) throw err;

        res.status(201).json({
            message: "created with sucess",
            todo: todo
        })
    })
}

exports.getTodos = (req, res) => {
    Todos.find({ userId: req.params.id }, (err, todos) => {
        if (err) throw err;
        res.status(200).json({
            todos: todos
        })
    })
}

exports.completeTodo = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Todos.findByIdAndUpdate(req.params.todoId, {
        $set: {
            completed: true
        }
    }, (err, todo) => {
        if (err) throw err;
        if (!todo) return res.status(404).json({ message: "Todo not found" })
        res.status(200).json({
            message: "completed with sucess"})
    })
}

exports.deleteTodo = (req,res) => {

    Todos.deleteOne({_id: req.params.todoId}, (err) => {
        if(err) throw err;
        
        res.status(200).json({
            message: "deleted with sucess"
        })
    })
}