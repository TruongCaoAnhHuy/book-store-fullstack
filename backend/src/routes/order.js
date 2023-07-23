const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.use('/:id', orderController.index);

router.use('/', orderController.show);

module.exports = router;
