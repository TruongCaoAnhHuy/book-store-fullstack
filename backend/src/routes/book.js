const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/BookController');

router.get('/:id', bookController.detail);

module.exports = router;
