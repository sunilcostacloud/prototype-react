const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure username uniqueness
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ["User"]
    }
});

module.exports = mongoose.model('User', userSchema);
