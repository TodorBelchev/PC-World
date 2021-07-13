const Notebook = require('../models/Notebook');

const createNotebook = (data) => {
    const notebook = new Notebook(data);
    return notebook.save();
};

const getNotebooksByPage = (page) => {
    return Notebook.find({}).skip(page * 16).limit(16);
}

module.exports = {
    createNotebook,
    getNotebooksByPage
}