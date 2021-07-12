const Notebook = require('../models/Notebook');

const createNotebook = (data) => {
    const notebook = new Notebook(data);
    return notebook.save();
};

module.exports = {
    createNotebook
}