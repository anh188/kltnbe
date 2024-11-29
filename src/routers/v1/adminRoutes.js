// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/AdminController');

// Route POST để tạo quản trị viên mới
router.post('/', adminController.create);

module.exports = router;
