const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createNotebook, getNotebooksByPage, getCount, getById } = require('../services/notebookService');
const isLoggedIn = require('../middlewares/isLogged');
const { isAdmin } = require('../middlewares/guards');
const extractFilterFromQuery = require('../utils/extractFilterFromQuery');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const filter = extractFilterFromQuery(req.query);
        const page = Number(req.query.page) - 1;
        const notebooks = await getNotebooksByPage(page, filter);
        const notebooksCount = await getCount(filter);
        res.status(200).send({ products: notebooks, count: notebooksCount.length });
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

router.put('/:id', async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        if (Object.values(incFiles).length > 0) {
            for (const file of Object.values(incFiles)) {
                const url = await uploadToCloudinary(file.path);
                imagesURL.push(url);
            }
            formData.images = imagesURL;
        } else {
            delete formData.images;
        }

        formData.promoPrice !== 0 ? formData.currentPrice = formData.promoPrice : formData.currentPrice = formData.price;
        const id = req.params.id;
        const notebook = await getById(id);
        Object.assign(notebook, formData);
        await notebook.save();
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

router.delete('/:id', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        const result = await getById(req.params.id);
        Object.assign(result, { isDeleted: true });
        await result.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;