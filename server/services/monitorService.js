const Monitor = require('../models/Monitor');

const createMonitor = (data) => {
    const monitor = new Monitor(data);
    return monitor.save();
};

const getMonitorsByPage = (page, filter) => {
    return Monitor.find({ ...filter, isDeleted: false }).skip(page * 16).limit(16);
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

module.exports = {
    createMonitor,
    getMonitorsByPage,
    getFilteredCount,
    getPromoMonitors,
    getById
}