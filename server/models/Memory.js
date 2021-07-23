const mongoose = require('mongoose');


const memorySchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    ramCapacity: {
        type: Number,
        required: true
    },
    memorySpeeds: {
        type: Number,
        required: true
    },
    memoryType: {
        type: String,
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    promoPrice: {
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

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;