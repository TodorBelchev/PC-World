const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');

const { createProc, getProcCount } = require('../services/processorService');
const { createVGA, getVGACount } = require('../services/vgaService');
const { createMB, getMBCount } = require('../services/motherboardService');
const { createMemory, getMemoryCount } = require('../services/memoryService');

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
        const proc = await createProc(formData);
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
        const vga = await createVGA(formData);
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
        const MB = await createMB(formData);
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
        const memory = await createMemory(formData);
        res.status(201).send(memory);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const procCount = await getProcCount();
        const vgaCount = await getVGACount();
        const MBCount = await getMBCount();
        const memoryCount = await getMemoryCount();
        res.status(200).send({
            processors: procCount,
            vga: vgaCount,
            MB: MBCount,
            memory: memoryCount
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;