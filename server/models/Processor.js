const mongoose = require('mongoose');


const processorSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    cores: {
        type: Number,
        required: true
    },
    threads: {
        type: Number,
        required: true
    },
    baseClock: {
        type: Number,
        required: true
    },
    boostClock: {
        type: Number,
        required: true
    },
    cache: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    box: {
        type: Boolean,
        required: true
    },
    images: [{
        type: String
    }]
});

const Processor = mongoose.model('Processor', processorSchema);

module.exports = Processor;