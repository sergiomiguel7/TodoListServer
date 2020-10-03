const { validationResult } = require('express-validator');
const User = require('../models/user.model');

exports.login = (req,res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        "name": req.body.username
    }, (err, user ) => {
        if(err) throw err;
        
        if(user){
            res.status(200).json({
                message: "Login sucessfull",
                user: user
            })
        }
    })
}