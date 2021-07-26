const Promotion = require('../models/Promotion');

const createPromo = (data) => {
    const promo = new Promotion(data);
    return promo.save();
};

const getById = (id) => {
    return Promotion.findById(id).populate('products');
}

const getAll = () => {
    return Promotion.find({});
}

module.exports = {
    createPromo,
    getById,
    getAll
}