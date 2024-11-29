const express = require('express');
const cookieParser = require('cookie-parser');
const AuthController = require('../../controllers/AuthController');

const router = express.Router();

router.use(cookieParser()); // Thêm middleware cookie-parser

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

module.exports = router;