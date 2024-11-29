// controllers/AdminController.js
const AdminService = require("../services/AdminService");

class AdminController {
    // API POST để tạo quản trị viên mới
    create = async (req, res) => {
        try {
            const { username, password, role } = req.body;

            // Kiểm tra các trường thông tin có đầy đủ không
            if (!username || !password || !role) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Tạo object dữ liệu cho quản trị viên mới
            let data = {
                username, password, role
            };

            // Gọi hàm create của AdminService để tạo quản trị viên và lưu vào DB
            const admin = await AdminService.create(data);

            // Trả về thông tin quản trị viên mới tạo
            res.status(200).json({
                message: "Admin created successfully",
                admin,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
}

module.exports = new AdminController();
