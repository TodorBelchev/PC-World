const Promotion = require('../models/Promotion');

const createPromo = (data) => {
    const promo = new Promotion(data);
    return promo.save();
};

const getById = (id, filter) => {
    return Promotion.findById(id).populate({
        path: 'products',
        match: filter
    });
}

const getAll = () => {
    return Promotion.find({});
}

const deletePromo = (id) => {
    return Promotion.findByIdAndDelete(id);
}

module.exports = {
    createPromo,
    getById,
    getAll,
    deletePromo
}