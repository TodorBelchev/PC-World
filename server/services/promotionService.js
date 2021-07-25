const Promotion = require('../models/Promotion');

const createPromo = (data) => {
    const promo = new Notebook(data);
    return promo.save();
};

const getById = (id) => {
    return Promotion.findById(id).populate('products');
}

module.exports = {
    createPromo,
    getById
}