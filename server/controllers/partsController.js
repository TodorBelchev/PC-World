const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createPart, getPartCount, getById } = require('../services/partService');
const isLoggedIn = require('../middlewares/isLogged');
const { isAdmin } = require('../middlewares/guards');
const { getPartsByPage, getFilteredCount, editPart, getBrandsByQuery } = require('../services/partService');
const extractFilterFromQuery = require('../utils/extractFilterFromQuery');

const router = Router();

router.get('/', async (req, res) => {
    try {
        let type = req.query.product;
        if (type === 'memories') {
            type = 'memory';
        } else {
            type = type.substring(0, type.length - 1);
        }
        const filter = extractFilterFromQuery(req.query);
        const page = Number(req.query.page || 1) - 1;
        let sort = { price: 'asc' };
        if (req.query.order && req.query.order === 'price-desc') {
            sort.price = 'desc';
        }
        const parts = await getPartsByPage(type, page, filter, sort);
        const partsCount = await getFilteredCount(type, filter);
        res.status(200).send({ products: parts, count: partsCount.length });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.get('/:partType/brands', async (req, res) => {
    try {
        let type = req.params.partType;
        if (type === 'memories') {
            type = 'memory';
        } else {
            type = type.substring(0, type.length - 1);
        }
        const filter = extractFilterFromQuery(req.query);
        const brands = await getBrandsByQuery(type, filter);
        res.status(200).send({ brands });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.get('/part/:partType/:id', async (req, res) => {
    try {
        let type = req.params.partType;
        if (type === 'memories') {
            type = 'memory';
        } else {
            type = type.substring(0, type.length - 1);
        }
        const part = await getById(req.params.id, type);
        res.status(200).send(part);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

router.delete('/part/:partType/:id', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        let type = req.params.partType;
        if (type === 'memories') {
            type = 'memory';
        } else {
            type = type.substring(0, type.length - 1);
        }
        const result = await getById(req.params.id, type);
        Object.assign(result, { isDeleted: true });
        await result.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

router.put('/part/:id', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        let partType = req.query.part.substring(0, req.query.part.length - 1);
        if (partType == 'memorie') {
            partType = 'memory';
        }
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

router.post('/create/:partType', isLoggedIn(), isAdmin(), async (req, res) => {
    try {
        let partType = req.params.partType.substring(0, req.params.partType.length - 1);
        if (partType == 'memorie') {
            partType = 'memory';
        }
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
        if (formData.images.length == 0) {
            throw new Error('At least one image is required!');
        }
        formData.promoPrice !== 0 ? formData.currentPrice = formData.promoPrice : formData.currentPrice = formData.price;
        const product = await createPart(partType, formData);
        res.status(201).send(product);
    } catch (error) {
        console.log(error);
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
            hdd: hddCount,
            ssd: ssdCount,
            case: caseCount,
            psu: psuCount,
            cooler: coolerCount
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;