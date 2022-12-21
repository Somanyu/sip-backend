const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 10,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 102
    },
})

module.exports = mongoose.model('User', userSchema);