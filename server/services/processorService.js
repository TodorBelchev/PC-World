const Processor = require('../models/Processor');

const createProc = (data) => {
    const proc = new Processor(data);
    return proc.save();
}

module.exports = {
    createProc
}