const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.delete('/delete/:id', userController.delete);
router.post('/edit/:id', userController.edit);
router.post('/update/:id', userController.update);
router.use('/logout/:id', userController.logout);
router.use('/login/:id', userController.login);

router.use('/', userController.user);

module.exports = router;
