module.exports = (app, callback) => {
    const mongoose = require('mongoose');

    let settings = {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };

    global.connection = mongoose.createConnection("mongodb://localhost:27017/todos",settings, (err) => {
        if(err) throw err;

        console.log("Connected to database.")
        return callback();

    } )
}