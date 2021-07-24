const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createPart, getPartCount, getPart } = require('../services/partService');
const isLoggedIn = require('../middlewares/isLogged');
const { isAdmin } = require('../middlewares/guards');
const { getPartsByPage, getFilteredCount, editPart } = require('../services/partService');
const extractFilterFromQuery = require('../utils/extractFilterFromQuery');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const filter = extractFilterFromQuery(req.query);
        const page = Number(req.query.page) - 1;
        const parts = await getPartsByPage(req.query.product, page, filter);
        res.status(200).send(parts);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }

});

router.get('/part/:partType/:id', async (req, res) => {
    try {
        const part = await getPart(req.params.partType, req.params.id);
        res.status(200).send(part);
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

router.put('/part/:id', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        const partType = req.query.part;
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
        const part = await editPart(partType, req.params.id, formData);
        res.status(200).send(part);
    } catch (error) {
        console.log(error);
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
        const filter = extractFilterFromQuery(req.query);
        const part = await getFilteredCount(req.query.product, filter);
        res.status(200).send({ count: part.length });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.get('/count/all', async (req, res) => {
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