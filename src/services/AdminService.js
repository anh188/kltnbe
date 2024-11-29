const bcrypt = require('bcryptjs');
const Admin = require("../models/Admin");

class AdminService {
    // Hàm tạo quản trị viên mới
    create = async (dataAdmin) => {
        try {
            // Mã hóa mật khẩu trước khi lưu
            const salt = await bcrypt.genSalt(10);
            dataAdmin.password = await bcrypt.hash(dataAdmin.password, salt);

            const admin = new Admin(dataAdmin);
            await admin.save(); // Lưu quản trị viên vào MongoDB
            return admin;
        } catch (error) {
            throw error; // Nếu có lỗi xảy ra, ném lỗi để xử lý ở Controller
        }
    };

    // Hàm kiểm tra và tạo tài khoản admin mặc định nếu chưa có
    createDefaultAdmin = async () => {
        try {
            // Kiểm tra xem admin mặc định đã tồn tại hay chưa
            const adminExists = await Admin.findOne({ username: 'admin' });
            if (adminExists) {
                console.log('Admin already exists');
                return;
            }

            // Nếu chưa có, tạo admin mặc định
            const defaultAdmin = {
                username: 'admin',
                password: 'admin123', // Mật khẩu mặc định (cần mã hóa sau)
                role: 'superadmin'
            };

            const salt = await bcrypt.genSalt(10);
            defaultAdmin.password = await bcrypt.hash(defaultAdmin.password, salt);

            const admin = new Admin(defaultAdmin);
            await admin.save(); // Lưu quản trị viên vào MongoDB
            console.log('Default admin created successfully');
        } catch (error) {
            console.error('Error creating default admin:', error);
        }
    };
}

module.exports = new AdminService();
