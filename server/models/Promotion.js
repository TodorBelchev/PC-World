const mongoose = require('mongoose');


const promotionSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true,
        enum: ['Notebook', 'Case', 'Cooler', 'HDD', 'Memory', 'Monitor', 'Motherboard', 'Processor', 'PSU', 'SSD', 'VGA']
    },
    expirationDate: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'productType'
        }
    ]
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;