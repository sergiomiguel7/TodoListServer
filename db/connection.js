module.exports = (app, callback) => {
    const mongoose = require('mongoose');

    let settings = {
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    global.connection = mongoose.createConnection("mongodb://localhost:27017/todos",settings, (err) => {
        if(err) throw err;

        console.log("Connected to database.")
        return callback();

    } )
}