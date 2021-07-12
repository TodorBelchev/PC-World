const { Router } = require('express');
const formidable = require('formidable');

const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { createNotebook } = require('../services/notebookService');

const router = Router();

router.post('/create', async (req, res) => {
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
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;