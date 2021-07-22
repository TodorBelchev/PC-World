const mongoose = require('mongoose');


const warrantySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    guest: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        city: {
            type: String
        },
        location: {
            type: String
        }
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    onModel: {
        type: String,
        require: true,
        enum: ['Notebook', 'Case', 'Cooler', 'HDD', 'Memory', 'Monitor', 'Motherboard', 'Processor', 'PSU', 'SSD', 'VGA']
    },
    purchaseQuantity: {
        type: Number,
        default: 1
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    warranty: {
        type: Number,
        default: 24
    }
});

const Warranty = mongoose.model('Warranty', warrantySchema);

module.exports = Warranty;