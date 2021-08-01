const Order = require('../models/Order');
const Warranty = require('../models/Warranty');

const createOrder = (orderData) => {
    const order = new Order(orderData);
    return order.save();
}

const getOrdersByUserIdAndPage = (userId, page) => {
    return Order.find({ user: userId }).skip(page * 10).limit(10).sort({ createdAt: 'desc' }).populate('products.product');
}

const getOrdersCountByUser = (userId) => {
    return Order.find({ user: userId });
}

const getActiveOrdersByPage = (page) => {
    return Order.find({ completed: false }).sort({ completed: 'asc' }).skip(page * 10).limit(10).populate('products.product');
}

const getActiveOrdersCount = () => {
    return Order.find({ completed: false });
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

const getWarrantiesByUserIdAndPage = (userId, page) => {
    return Warranty.find({ user: userId }).skip(page * 10).limit(10).populate('product').populate('order');
};

const getAllWarrantiesByUserId = (userId) => {
    return Warranty.find({ user: userId });
}

const deleteWarrantiesByOrderId = (orderId) => {
    return Warranty.deleteMany({ order: orderId });
}

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

const updateOrder = (id, body) => {
    return Order.findOneAndUpdate({ _id: id }, body, { useFindAndModify: false });
}

module.exports = {
    createOrder,
    getOrdersByUserIdAndPage,
    getActiveOrdersByPage,
    getOrder,
    deleteOrder,
    generateWarranty,
    getWarrantiesByUserIdAndPage,
    getCurrentSales,
    getAllOrders,
    getArchivedOrders,
    getArchivedOrdersCount,
    getAllWarrantiesByUserId,
    deleteWarrantiesByOrderId,
    updateOrder,
    getOrdersCountByUser,
    getActiveOrdersCount
}