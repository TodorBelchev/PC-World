const Order = require('../models/Order');
const Warranty = require('../models/Warranty');

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
        const order = await Order.findById(orderId).populate('products.product');
        Object.assign(order, { status: data.status });
        return order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteOrder = (orderId) => {
    return Order.deleteOne({ _id: orderId });
}

const generateWarranty = (product) => {
    const warranty = new Warranty(product);
    return warranty.save();
}

const getWarrantiesByUserId = (userId) => {
    return Warranty.find({ user: userId }).populate('product').populate('order');
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrdersByPage,
    editOrder,
    deleteOrder,
    generateWarranty,
    getWarrantiesByUserId
}