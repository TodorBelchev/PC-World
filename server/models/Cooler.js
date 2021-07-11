const mongoose = require('mongoose');


const coolerSchema = new mongoose.Schema({
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
    height: {
        type: Number,
        required: true
    },
    fanRPM: {
        type: Number,
        required: true
    },
    airflow: {
        type: Number,
        required: true
    },
    noise: {
        type: Number,
        required: true
    },
    fanSize: {
        type: Number,
        required: true
    },
    connector: {
        type: String,
        required: true
    },
    type: {
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
    quantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }]
});

const Cooler = mongoose.model('Cooler', coolerSchema);

module.exports = Cooler;