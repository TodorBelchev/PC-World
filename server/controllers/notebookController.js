const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createNotebook, getNotebooksByPage, getCount, getNotebookById } = require('../services/notebookService');
const isLoggedIn = require('../middlewares/isLogged');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const incFilter = req.query;
        const filter = {};
        
        if (incFilter.priceFrom && !incFilter.priceTo) {
            filter.currentPrice = { $gte: incFilter.priceFrom };
        } else if (incFilter.priceTo && !incFilter.priceFrom) {
            filter.currentPrice = { $lte: incFilter.priceTo };
        } else if (incFilter.priceTo && incFilter.priceFrom) {
            filter.currentPrice = { $gte: incFilter.priceFrom, $lte: incFilter.priceTo };
        }
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
        const incFilter = req.query;
        const filter = {};
        if (incFilter.priceFrom && !incFilter.priceTo) {
            filter.currentPrice = { $gte: incFilter.priceFrom };
        } else if (incFilter.priceTo && !incFilter.priceFrom) {
            filter.currentPrice = { $lte: incFilter.priceTo };
        } else if (incFilter.priceTo && incFilter.priceFrom) {
            filter.currentPrice = { $gte: incFilter.priceFrom, $lte: incFilter.priceTo };
        }

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
        const notebook = await getNotebookById(id);
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
        const notebook = await createNotebook(formData);
        res.status(201).send(notebook);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;