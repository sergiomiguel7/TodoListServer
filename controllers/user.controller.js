const User = require('../models/user.model');
const { validationResult } = require('express-validator');

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        "name": req.body.username
    }, (error, user) => {
        if(error) throw error;
        if (user) return res.status(409).send("User already exist");

        new User({
            name: req.body.username
        }).save((error, user) => {
            if(error) throw error;

            res.status(200).json({
                message: "created with sucess",
                user: user
            })
        })
    })
}