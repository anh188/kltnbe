// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/CustomerController');

// Route POST để tạo khách hàng mới
router.post('/', customerController.create);

module.exports = router;
