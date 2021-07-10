const mongoose = require('mongoose');


const hddSchema = new mongoose.Schema({
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

const HDD = mongoose.model('HDD', hddSchema);

module.exports = HDD;