const mongoose = require('mongoose');


const vgaSchema = new mongoose.Schema({
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
    gameClock: {
        type: Number,
        required: true
    },
    boostClock: {
        type: Number,
        required: true
    },
    memory: {
        type: Number,
        required: true
    },
    memoryClock: {
        type: Number,
        required: true
    },
    connectors: {
        type: String,
        required: true
    },
    power: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    warranty: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }]
});

const Processor = mongoose.model('VGA', vgaSchema);

module.exports = Processor;