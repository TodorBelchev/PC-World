const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createMonitor } = require('../services/monitorService');
const isLoggedIn = require('../middlewares/isLogged');
const { isAdmin } = require('../middlewares/guards');
const { getMonitorsByPage, getFilteredCount, getById, deleteMonitor } = require('../services/monitorService');
const extractFilterFromQuery = require('../utils/extractFilterFromQuery');

const router = Router();

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
        const monitor = await createMonitor(formData);
        res.status(201).send(monitor);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const filter = extractFilterFromQuery(req.query);
        const page = Number(req.query.page || 1) - 1;
        const monitors = await getMonitorsByPage(page, filter);
        const monitorsCount = await getFilteredCount(filter);
        res.status(200).send({ products: monitors, count: monitorsCount.length });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/:id', async (req, res) => {
    try {
        const monitor = await getById(req.params.id);
        res.status(200).send(monitor);
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
        const monitor = await getById(id);
        Object.assign(monitor, formData);
        await monitor.save();
        res.status(200).send(monitor);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.delete('/:id', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        const result = await deleteMonitor(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;