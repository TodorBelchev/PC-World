const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createMonitor } = require('../services/monitorService');
const isLoggedIn = require('../middlewares/isLogged');
const { getMonitorsByPage, getFilteredCount } = require('../services/monitorService');
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
        const page = Number(req.query.page) - 1;
        const monitors = await getMonitorsByPage(page, filter);
        res.status(200).send(monitors);
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
        if (incFilter.promotion == 'true') {
            filter.promoPrice = { $gt: 0 };
        } else if (incFilter.promotion == 'false') {
            filter.promoPrice = 0;
        }

        const monitors = await getFilteredCount(filter);
        res.status(200).send({ count: monitors.length });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;