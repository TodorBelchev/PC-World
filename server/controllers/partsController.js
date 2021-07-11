const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createPart, getPartCount } = require('../services/partService');

const router = Router();

router.post('/create/processor', async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
        const proc = await createPart('processor', formData);
        res.status(201).send(proc);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/vga', async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
        const vga = await createPart('vga', formData);
        res.status(201).send(vga);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/motherboard', async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
        const MB = await createPart('motherboard', formData);
        res.status(201).send(MB);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/memory', async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
        const memory = await createPart('memory', formData);
        res.status(201).send(memory);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/hdd', async (req, res) => {
    try {
        const imagesURL = [];
        const form = formidable({ multiples: true });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imagesURL.push(url);
        }

        formData.images = imagesURL;
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

router.get('/count', async (req, res) => {
    try {
        const [procCount, vgaCount, MBCount, memoryCount, hddCount, ssdCount] = await Promise.all([
            getPartCount('processor'),
            getPartCount('vga'),
            getPartCount('motherboard'),
            getPartCount('memory'),
            getPartCount('hdd'),
            getPartCount('ssd'),
        ]);
        res.status(200).send({
            processors: procCount,
            vga: vgaCount,
            MB: MBCount,
            memory: memoryCount,
            hdd: hddCount + ssdCount
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;