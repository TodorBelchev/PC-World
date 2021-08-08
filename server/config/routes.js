const { Router } = require('express');

const authController = require('../controllers/authController');
const partsController = require('../controllers/partsController');
const notebookController = require('../controllers/notebookController');
const monitorController = require('../controllers/monitorController');
const commentController = require('../controllers/commentController');
const orderController = require('../controllers/orderController');
const promotionController = require('../controllers/promotionController');

const router = Router();

router.use('/user', authController);
router.use('/parts', partsController);
router.use('/notebooks', notebookController);
router.use('/monitors', monitorController);
router.use('/comments', commentController);
router.use('/orders', orderController);
router.use('/promotions', promotionController);

module.exports = router;