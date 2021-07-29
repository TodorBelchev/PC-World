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
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "products.onModel"
        },
        onModel: {
            type: String,
            require: true,
            enum: ['Notebook', 'Case', 'Cooler', 'Hdd', 'Memory', 'Monitor', 'Motherboard', 'Processor', 'Psu', 'Ssd', 'Vga']
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
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    deliveryPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;