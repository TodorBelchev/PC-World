const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createPart, getPartCount } = require('../services/partService');
const isLoggedIn = require('../middlewares/isLogged');
const { getPartsByPage } = require('../services/partService');

const router = Router();

router.get('/processor', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('processor', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/vgas', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('vga', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/hdds', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('hdd', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/ssds', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('ssd', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/memories', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('memory', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/motherboards', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('motherboard', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/cases', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('case', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/psus', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('psu', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/coolers', async (req, res) => {
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
        } else {
            filter.promoPrice = 0;
        }
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage('cooler', page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.post('/create/processor', isLoggedIn(), async (req, res) => {
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
        const proc = await createPart('processor', formData);
        res.status(201).send(proc);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/vga', isLoggedIn(), async (req, res) => {
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
        const vga = await createPart('vga', formData);
        res.status(201).send(vga);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/motherboard', isLoggedIn(), async (req, res) => {
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
        const MB = await createPart('motherboard', formData);
        res.status(201).send(MB);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/memory', isLoggedIn(), async (req, res) => {
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
        const memory = await createPart('memory', formData);
        res.status(201).send(memory);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/hdd', isLoggedIn(), async (req, res) => {
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
        let product;
        if (formData.type === 'hdd') {
            product = await createPart('hdd', formData);
        } else if (formData.type === 'ssd') {
            product = await createPart('ssd', formData);
        }
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/case', isLoggedIn(), async (req, res) => {
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
        const product = await createPart('case', formData);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/psu', isLoggedIn(), async (req, res) => {
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
        const product = await createPart('psu', formData);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/cooler', isLoggedIn(), async (req, res) => {
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
        const product = await createPart('cooler', formData);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const [
            procCount,
            vgaCount,
            MBCount,
            memoryCount,
            hddCount,
            ssdCount,
            caseCount,
            psuCount,
            coolerCount
        ] = await Promise.all([
            getPartCount('processor'),
            getPartCount('vga'),
            getPartCount('motherboard'),
            getPartCount('memory'),
            getPartCount('hdd'),
            getPartCount('ssd'),
            getPartCount('case'),
            getPartCount('psu'),
            getPartCount('cooler')
        ]);
        res.status(200).send({
            processors: procCount,
            vga: vgaCount,
            MB: MBCount,
            memory: memoryCount,
            hdd: hddCount + ssdCount,
            case: caseCount,
            psu: psuCount,
            cooler: coolerCount
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;