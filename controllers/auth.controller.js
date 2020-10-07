const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        "name": req.body.username
    }, (err, user) => {
        if (err) throw err;

        if (!user || !bcrypt.compareSync(req.body.password, user.password))
            return res.header("Authorization", null).status(403).send("User password wrong");

        let payload = {
            _id: user._id,
            username: req.body.username
        }

        let options = {
            expiresIn: "7d"
        }

        let token = jwt.sign(payload, process.env.TOKEN_SECRET, options);

        User.findByIdAndUpdate(user._id, {
            $set: {
                token: token
            }
        }, (err, user) => {
            if (err) throw err;
            if (user) {

                user.token = token;

                res.status(200).json({
                    message: "Login sucessfull",
                    user: user
                })
            }
        })
    })
}

exports.checkAuth = (req, res, callback) => {
    let token = req.get("Authorization");
    if (!token) return res.status(401).send("Invalid token!");

    let matchTokenUser = token.split(" ");

    User.findOne({
        "token": matchTokenUser[1]
    }, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(401).send("Invalid token!");

        jwt.verify(matchTokenUser[1], process.env.TOKEN_SECRET, (err) => {
            if (err) return res.status(401).send("Invalid token!");

            req.user = user;
            return callback();
        });
    });








}