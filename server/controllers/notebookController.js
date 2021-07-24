const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createNotebook, getNotebooksByPage, getCount, getById } = require('../services/notebookService');
const isLoggedIn = require('../middlewares/isLogged');
const extractFilterFromQuery = require('../utils/extractFilterFromQuery');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const filter = extractFilterFromQuery(req.query);
        const page = Number(req.query.page) - 1;
        const notebooks = await getNotebooksByPage(page, filter);
        res.status(200).send(notebooks);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/count', async (req, res) => {
    try {
        const filter = extractFilterFromQuery(req.query);
        const notebooks = await getCount(filter);
        res.status(200).send({ count: notebooks.length });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const notebook = await getById(id);
        res.status(200).send(notebook);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});


router.post('/create', isLoggedIn(), async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
        formData.promoPrice !== 0 ? formData.currentPrice = formData.promoPrice : formData.currentPrice = formData.price;
        const notebook = await createNotebook(formData);
        res.status(201).send(notebook);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;