const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Address = mongoose.model('Address', schema);

module.exports = Address;