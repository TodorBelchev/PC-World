const mongoose = require('mongoose');


const ssdSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    readSpeed: {
        type: Number,
        required: true
    },
    writeSpeed: {
        type: Number,
        required: true
    },
    randomRead: {
        type: Number,
        required: true
    },
    randomWrite: {
        type: Number,
        required: true
    },
    mtbf: {
        type: Number,
        required: true
    },
    interface: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    warranty: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }]
});

const SSD = mongoose.model('SSD', ssdSchema);

module.exports = SSD;