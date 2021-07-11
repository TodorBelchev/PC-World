const mongoose = require('mongoose');


const caseSchema = new mongoose.Schema({
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
    supportedMB: {
        type: String,
        required: true
    },
    frontPanel: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
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
    quantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }]
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;