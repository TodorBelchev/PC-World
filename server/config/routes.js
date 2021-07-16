const { Router } = require('express');

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const partsController = require('../controllers/partsController');
const notebookController = require('../controllers/notebookController');
const monitorController = require('../controllers/monitorController');
const commentController = require('../controllers/commentController');

const router = Router();

router.use('/', homeController);
router.use('/user', authController);
router.use('/parts', partsController);
router.use('/notebooks', notebookController);
router.use('/monitors', monitorController);
router.use('/comments', commentController);

module.exports = router;