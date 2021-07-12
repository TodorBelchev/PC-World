const { Router } = require('express');

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const partsController = require('../controllers/partsController');
const notebookController = require('../controllers/notebookController');

const router = Router();

router.use('/', homeController);
router.use('/user', authController);
router.use('/parts', partsController);
router.use('/notebooks', notebookController);

module.exports = router;