const mongoose = require('mongoose');


const notebookSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    processor: {
        type: String,
        required: true
    },
    processorCores: {
        type: Number,
        required: true
    },
    processorBrand: {
        type: String,
        required: true
    },
    processorModel: {
        type: String,
        required: true
    },
    memoryType: {
        type: String,
        required: true
    },
    memoryCapacity: {
        type: Number,
        required: true
    },
    memorySpeed: {
        type: Number,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    storageCapacity: {
        type: Number,
        required: true
    },
    graphics: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    displaySize: {
        type: Number,
        required: true
    },
    displayResolution: {
        type: String,
        required: true
    },
    displayRefreshRate: {
        type: Number,
        required: true
    },
    ports: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    battery: {
        type: String,
        required: true
    },
    OS: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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

const Notebook = mongoose.model('Notebook', notebookSchema);

module.exports = Notebook;