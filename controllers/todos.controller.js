const Todos = require('../models/todo.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    const todo = await Todos.create(new Todos({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        marked_date: req.body.marked_date
    }))

    await User.findByIdAndUpdate(
        req.params.id,
        { $push: { todos: [todo._id] } })
        .populate('todos')


    res.status(200).json({
        message: "created with sucess",
        newTodo: todo
    })

}

exports.getTodos = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.find({ _id: req.params.id }, async (err, user) => {
        if (err) throw err;

        let populatedUser = await user[0].populate('todos').execPopulate();

        res.status(200).json({
            todos: populatedUser.todos
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
            message: "completed with sucess"
        })
    })
}

exports.deleteTodo = async (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    let changed = await User.updateOne({}, { $pull: { todos: req.params.todoId } })

    await Todos.deleteOne({_id: req.params.todoId}, (err) => {
        if(err) throw err;
    })

    if(changed.n == 0)
        res.status(404).json({message: "Todo not found"})
    else
        res.status(200).json({message: "Deleted with sucess"})
}