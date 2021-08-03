const Monitor = require('../models/Monitor');

const createMonitor = (data) => {
    const monitor = new Monitor(data);
    return monitor.save();
};

const getMonitorsByPage = (page, filter, sort) => {
    return Monitor.find({ ...filter, isDeleted: false }).sort(sort).skip(page * 16).limit(16);
}

const getFilteredCount = (filter) => {
    return Monitor.find({ ...filter, isDeleted: false });
}

const getPromoMonitors = () => {
    return Monitor.find({ promoPrice: { $gt: 0 }, isDeleted: false }).limit(2).lean();
}

const getById = (id) => {
    return Monitor.findById(id);
}

const getBrandsByQuery = (filter) => {
    return Monitor.find({ ...filter, isDeleted: false }).select('brand').distinct('brand') ;
}

module.exports = {
    createMonitor,
    getMonitorsByPage,
    getFilteredCount,
    getPromoMonitors,
    getById,
    getBrandsByQuery
}