const Notebook = require('../models/Notebook');

const createNotebook = (data) => {
    const notebook = new Notebook(data);
    return notebook.save();
};

const getById = (id) => {
    return Notebook.findById(id);
}

const getNotebooksByPage = (page, filter) => {
    return Notebook.find({ ...filter, isDeleted: false }).skip(page * 16).limit(16);
}

const getCount = (filter) => {
    return Notebook.find({ ...filter, isDeleted: false });
}

const getPromoNotebooks = () => {
    return Notebook.find({ promoPrice: { $gt: 0 }, isDeleted: false }).limit(10).lean();
}

module.exports = {
    createNotebook,
    getNotebooksByPage,
    getCount,
    getById,
    getPromoNotebooks
}