const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/RegisterController');

router.use('/', registerController.register);

module.exports = router;
