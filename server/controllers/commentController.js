const { Router } = require('express');

const { createComment } = require('../services/commentService');

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const comment = await createComment(req.body.comment, req.body._id, req.body.productName);
        res.status(201).send(comment);
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
});

module.exports = router;