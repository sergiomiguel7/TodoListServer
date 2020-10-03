const express = require('express');
const validator = require('express-validator');
const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.route('/')
    .post([validator.body('username').isString()], UserController.create)

router.route('/login')    
    .post([validator.body('username').isString()], AuthController.login)

module.exports = router;