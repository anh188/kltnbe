const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UserController');
const { verifyToken, verifyTokenAndAdminAuth } = require('../../middlewares/verifyToken');

// Bảo vệ endpoint danh sách user
router.get("/me", verifyToken, userController.getMe);
router.get("/", verifyToken, userController.getAllUsers);

// Bảo vệ endpoint xóa user với quyền admin hoặc chính chủ
router.delete("/:id", verifyTokenAndAdminAuth, userController.deleteUser);
router.patch("/:id", verifyTokenAndAdminAuth, userController.updateUserAndAdmin);
// router.patch("/:id/admin", verifyTokenAndAdminAuth, userController.updateAdmin);
module.exports = router;
