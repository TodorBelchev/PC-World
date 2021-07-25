const { Router } = require('express');
const formidable = require('formidable');

const { createPromo, getById } = require('../services/promotionService');
const isLoggedIn = require('../middlewares/isLogged');
const { getFromData } = require('../utils/parseForm');
const { uploadToCloudinary } = require('../utils/cloudinary');

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const promo = await getById(req.params.id);
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
        const promo = await createPromo(formData);
        res.status(201).send(promo);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;