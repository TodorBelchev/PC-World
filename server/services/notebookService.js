const Notebook = require('../models/Notebook');

const createNotebook = (data) => {
    const notebook = new Notebook(data);
    return notebook.save();
};

const getById = (id) => {
    return Notebook.findById(id);
}

const getNotebooksByPage = (page, filter) => {
    return Notebook.find(filter).skip(page * 16).limit(16);
}

const getCount = (filter) => {
    return Notebook.find(filter);
}

const getPromoNotebooks = () => {
    return Notebook.find({ promoPrice: { $gt: 0 } }).limit(10).lean();
}

const deleteNotebook = (id) => {
    return Notebook.deleteOne({ _id: id });
}

module.exports = {
    createNotebook,
    getNotebooksByPage,
    getCount,
    getById,
    getPromoNotebooks,
    deleteNotebook
}