const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.post('/create', productController.store);
router.delete('/delete/:id', productController.delete);
router.post('/edit/:id', productController.edit);
router.post('/update/:id', productController.update);
router.get('/slider', productController.slider);
router.get('/feature', productController.feature);

router.get('/', productController.product);

module.exports = router;
