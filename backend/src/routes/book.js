const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/BookController');

router.use('/:id', bookController.detail);

module.exports = router;
