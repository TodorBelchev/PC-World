const Memory = require('../models/Memory');

const createMemory = (data) => {
    const proc = new Memory(data);
    return proc.save();
}

const getMemoryCount = () => {
    return Memory.collection.countDocuments();
}

module.exports = {
    createMemory,
    getMemoryCount
}