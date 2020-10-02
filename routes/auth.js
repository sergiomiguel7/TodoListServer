const express = require('express');
const validator = require('express-validator');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
    .post([validator.body('username').isString()], UserController.create)

module.exports = router;