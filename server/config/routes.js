const { Router } = require('express');

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const partsController = require('../controllers/partsController');

const router = Router();

router.use('/', homeController);
router.use('/user', authController);
router.use('/parts', partsController);

module.exports = router;