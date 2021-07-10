const VGA = require('../models/VGA');

const createVGA = (data) => {
    const vga = new VGA(data);
    return vga.save();
}

const getVGACount = () => {
    return VGA.collection.countDocuments();
}

module.exports = {
    createVGA,
    getVGACount
}