const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.post('/create', productController.store);
router.delete('/delete/:id', productController.delete);
router.post('/edit/:id', productController.edit);
router.post('/update/:id', productController.update);
router.use('/', productController.product);

module.exports = router;
