const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "products.type"
        },
        type: {
            type: String,
            require: true,
            enum: ['notebooks', 'Case', 'Cooler', 'HDD', 'Memory', 'Monitor', 'Motherboard', 'Processor', 'PSU', 'SSD', 'VGA']
        },
        purchaseQuantity: {
            type: Number,
            default: 1
        },
        purchasePrice: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: String,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;