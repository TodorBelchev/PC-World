const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    city: {
        type: String
    },
    location: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;