const mongoose = require('mongoose');


const motherboardSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    socket: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    chipset: {
        type: String,
        required: true
    },
    memorySlots: {
        type: Number,
        required: true
    },
    memorySpeeds: {
        type: String,
        required: true
    },
    ramCapacity: {
        type: Number,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    lan: {
        type: String,
        required: true
    },
    wireless: {
        type: String
    },
    connectors: {
        type: String,
        required: true
    },
    storage: {
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

const Motherboard = mongoose.model('Motherboard', motherboardSchema);

module.exports = Motherboard;