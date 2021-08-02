const { Router } = require('express');
const formidable = require('formidable');

const { createPromo, getById, getAll, deletePromo } = require('../services/promotionService');
const { getPromoNotebooks } = require('../services/notebookService');
const { getPromoParts } = require('../services/partService');
const { getPromoMonitors } = require('../services/monitorService');
const isLoggedIn = require('../middlewares/isLogged');
const { isAdmin } = require('../middlewares/guards');
const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const extractFilterFromQuery = require('../utils/extractFilterFromQuery');
const shuffleArray = require('../utils/shuffleArray');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const parts = await getAll();
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        let products = [];

        const [parts, notebooks, monitors] = await Promise.all([
            getPromoParts(),
            getPromoNotebooks(),
            getPromoMonitors()
        ]);

        const types = ['processors', 'vgas', 'ssds', 'hdds', 'motherboards', 'memories', 'cases', 'psus', 'coolers'];

        for (let i = 0; i < parts.length; i++) {
            parts[i].forEach(x => {
                x.productType = types[i];
                products.push(x);
            });
        }


        notebooks.map(x => {
            return Object.assign(x, { productType: 'notebooks' })
        });

        monitors.map(x => {
            return Object.assign(x, { productType: 'monitors' })
        });

        products = shuffleArray([...products, ...notebooks, ...monitors]);
        res.status(200).send(products);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const filter = extractFilterFromQuery(req.query);
        const promo = await getById(req.params.id, filter);
        res.status(200).send(promo);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.post('/', isLoggedIn(), async (req, res) => {
    try {
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);
        formData.products = JSON.parse(formData.products);
        const imagesURL = [];

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.image = imagesURL[0];
        if (!formData.image || formData.products.length == 0 || !formData.productType || !formData.expirationTime || !formData.promoName) {
            throw new Error('All fields are required!');
        }
        const promo = await createPromo(formData);
        res.status(201).send(promo);
    } catch (error) {
        console.log(error.message);
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.delete('/:id', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        await deletePromo(req.params.id);
        res.status(201).send({});
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;