const Processor = require('../models/Processor');

const createProc = (data) => {
    const proc = new Processor(data);
    return proc.save();
}

const getProcCount = () => {
    return Processor.collection.countDocuments();
}

module.exports = {
    createProc,
    getProcCount
}