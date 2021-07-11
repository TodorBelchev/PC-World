const Processor = require('../models/Processor');
const VGA = require('../models/VGA');
const SSD = require('../models/Ssd');
const HDD = require('../models/Hdd');
const Motherboard = require('../models/Motherboard');
const Memory = require('../models/Memory');
const Case = require('../models/Case');
const PSU = require('../models/Psu');
const Cooler = require('../models/Cooler');

const parts = {
    processor: Processor,
    vga: VGA,
    ssd: SSD,
    hdd: HDD,
    motherboard: Motherboard,
    memory: Memory,
    case: Case,
    psu: PSU,
    cooler: Cooler
}

const createPart = (partName, data) => {
    const product = new parts[partName](data);
    return product.save();
}

const getPartCount = (partName) => {
    return parts[partName].collection.countDocuments();
}

module.exports = {
    createPart,
    getPartCount
}