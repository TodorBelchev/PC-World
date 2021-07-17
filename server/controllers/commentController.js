const { Router } = require('express');

const { createComment, getComments, getCount } = require('../services/commentService');
const isLoggedIn = require('../middlewares/isLogged');

const router = Router();

router.post('/create', isLoggedIn(), async (req, res) => {
    try {
        const comment = await createComment(req.body.comment, req.body._id, req.body.productName);
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
        console.log(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const page = req.query.page - 1;
        const modelId = req.query.modelId;
        const comments = await getComments(modelId, page);
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
        console.log(error.message);
    }
});

router.get('/count', async (req, res) => {
    try {
        const modelId = req.query.modelId;
        const comments = await getCount(modelId);
        res.status(200).send({ count: comments.length});
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
        console.log(error.message);
    }
});

module.exports = router;