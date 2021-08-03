const Promotion = require('../models/Promotion');

const createPromo = (data) => {
    const promo = new Promotion(data);
    return promo.save();
};

const getById = (id, filter, sort) => {
    return Promotion.findById(id).populate({
        path: 'products',
        match: filter,
        options: {
            sort: sort
        }
    });
}

const getByIdPure = (id) => {
    return Promotion.findById(id);
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
    deletePromo,
    getByIdPure
}