const mongoose = require('mongoose');


const psuSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },
    efficiency: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    connectors: {
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

const PSU = mongoose.model('PSU', psuSchema);

module.exports = PSU;