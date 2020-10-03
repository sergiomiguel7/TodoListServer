const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: String,
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = global.connection.model('todos', todoSchema);