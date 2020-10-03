const express = require('express');
const validator = require('express-validator');
const TodoController = require('../controllers/todos.controller');

const router = express.Router();

/* 
@param id -> userId
routes to post and get user todos
*/
router.route('/:id')
    .post([validator.body("title").isString(),
    validator.body("description").optional().isString(),
    validator.body("marked_date").optional().isDate()
    ], [validator.param("id").isMongoId()], TodoController.create)
    .get([validator.param("id").isMongoId()], TodoController.getTodos)

/* 
@param todoId 
routes to delete or update a todo instance
*/
router.route('/:todoId')
    .patch([validator.param("todoId").isMongoId()], TodoController.completeTodo)
    .delete([validator.param("todoId").isMongoId()], TodoController.deleteTodo)
module.exports = router; 