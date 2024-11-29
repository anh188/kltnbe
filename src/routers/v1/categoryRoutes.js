const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/CategoryController');

// Route để lấy danh sách danh mục
router.get('/', categoryController.getAll);

// Route để tạo danh mục mới
router.post('/', categoryController.create);

module.exports = router;
