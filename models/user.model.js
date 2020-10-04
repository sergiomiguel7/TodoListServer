const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    active: {
        type: Boolean,
        default: true
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'todos'
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = global.connection.model('users', userSchema)