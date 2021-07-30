const Order = require('../models/Order');
const Warranty = require('../models/Warranty');

const createOrder = (orderData) => {
    const order = new Order(orderData);
    return order.save();
}

const getOrdersByUserId = (userId) => {
    return Order.find({ user: userId }).populate('products.product').sort({ createdAt: 'desc' });
}

const getActiveOrdersByPage = (page) => {
    return Order.find({ completed: false }).sort({ completed: 'asc' }).skip(page * 10).limit(10).populate('products.product');
}

const getOrder = async (orderId) => {
    return Order.findById(orderId).populate('products.product');
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

const getCurrentSales = (period) => {
    let date;
    const msSinceMidnight = new Date() - new Date().setHours(0, 0, 0, 0);
    if (period == 'current') {
        date = new Date(Date.now() - 518400000 - msSinceMidnight);
    } else {
        date = new Date(Date.now() - 2592000000 - msSinceMidnight);
    }
    return Order.aggregate([
        { $match: { createdAt: { $gte: date }, status: 'completed' } },
        { $group: { _id: "$createdAt", total: { $sum: "$totalPrice" } } }
    ]).sort({ _id: 1 });
}

const getAllOrders = () => {
    return Order.find({}).lean();
}

const getArchivedOrders = (page, startDate, endDate) => {
    return Order.find({
        completed: true, createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ createImageBitmap: 'asc' }).skip(page * 10).limit(10).populate('products.product');
}

const getArchivedOrdersCount = (startDate, endDate) => {
    return Order.find({
        completed: true, createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    });
}

module.exports = {
    createOrder,
    getOrdersByUserId,
    getActiveOrdersByPage,
    getOrder,
    deleteOrder,
    generateWarranty,
    getWarrantiesByUserId,
    getCurrentSales,
    getAllOrders,
    getArchivedOrders,
    getArchivedOrdersCount
}