const User = require('../models/User');


const createUser = (body) => {
    const user = new User(body);
    return user.save();
}

const getUserById = (userId) => {
    return User.findById(userId);
}

const getUserByEmail = (email) => {
    return User.findOne({ email });
}


module.exports = {
    createUser,
    getUserById,
    getUserByEmail
}