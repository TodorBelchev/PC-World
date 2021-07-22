const Order = require('../models/Order');

const createOrder = (orderData) => {
    const order = new Order(orderData);
    return order.save();
}

const getOrdersByUserId = (userId) => {
    return Order.find({ user: userId }).populate('products.product').sort({ createdAt: 'desc' });
}

const getOrdersByPage = (page) => {
    return Order.find({}).sort({ createdAt: 'desc' }).skip(page * 10).limit(10).populate('products.product');
}

const editOrder = async (orderId, data) => {
    try {
        const order = await Order.findById(orderId);
        Object.assign(order, data);
        console.log(order);
        return order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteOrder = async (orderId) => {
    return Order.deleteOne({ _id: orderId });
}


module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrdersByPage,
    editOrder,
    deleteOrder
}