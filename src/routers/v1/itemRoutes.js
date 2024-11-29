const express = require('express');
const router = express.Router();
const ItemController = require('../../controllers/ItemController'); // Đảm bảo bạn đã import đúng controller
const upload = require('../../middlewares/upload')

// API tạo món ăn mới
router.post('/', upload.single('image'), ItemController.create); // 'image' là trường file trong form

router.put('/:id', upload.single('image'), ItemController.update); // 'image' là trường file trong form
// API lấy tất cả món ăn
router.get('/', ItemController.getAll);

// API lấy món ăn theo id
router.get('/:id', ItemController.getById);

// API xóa món ăn
router.delete('/:id', ItemController.delete);

module.exports = router;
