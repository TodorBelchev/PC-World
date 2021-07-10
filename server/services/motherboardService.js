const Motherboard = require('../models/Motherboard');

const createMB = (data) => {
    const proc = new Motherboard(data);
    return proc.save();
}

const getMBCount = () => {
    return Motherboard.collection.countDocuments();
}

module.exports = {
    createMB,
    getMBCount
}