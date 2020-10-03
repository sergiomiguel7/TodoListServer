const express = require('express');
const validator = require('express-validator');
const TodoController = require('../controllers/todos.controller');

const router = express.Router();

/* 
@param id -> userId
*/
router.route('/:id')
    .post([validator.body("title").isString(),
    validator.body("description").isString()
    ], [validator.param("id").isMongoId()], TodoController.create)
    .get([validator.param("id").isMongoId()], TodoController.getTodos)

/* 
@param todoId 
*/
router.route('/:todoId')
    .patch([validator.param("todoId").isMongoId()], TodoController.completeTodo)
    .delete([validator.param("todoId").isMongoId()], TodoController.deleteTodo)
module.exports = router; 