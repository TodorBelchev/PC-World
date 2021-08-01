const mongoose = require('mongoose');


const monitorSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    resolution: {
        type: String,
        required: true
    },
    refreshRate: {
        type: Number,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    },
    brightness: {
        type: Number,
        required: true
    },
    ports: {
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
    isDeleted: {
        type: Boolean,
        default: false
    },
    quantity: {
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

const Monitor = mongoose.model('Monitor', monitorSchema);

module.exports = Monitor;