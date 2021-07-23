const Monitor = require('../models/Monitor');

const createMonitor = (data) => {
    const monitor = new Monitor(data);
    return monitor.save();
};

const getMonitorsByPage = (page, filter) => {
    return Monitor.find(filter).skip(page * 16).limit(16);
}

module.exports = {
    createMonitor,
    getMonitorsByPage
}