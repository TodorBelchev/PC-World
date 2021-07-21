const Order = require('../models/Order');
const Notebook = require('../models/Notebook');
const Case = require('../models/Case');

const createOrder = (orderData) => {
    const order = new Order(orderData);
    return order.save();
}

const getOrdersByUserId = (userId) => {
    return Order.find({ user: userId }).populate('products.product').sort({ createdAt: 'desc' });
}

module.exports = {
    createOrder,
    getOrdersByUserId
}