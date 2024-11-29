const mongoose = require('mongoose');
const Admin = require('../../models/Admin'); // Import mô hình Admin
const dotenv = require('dotenv')
dotenv.config();

async function createDefaultAdmin() {
  // Kiểm tra nếu không có admin nào trong hệ thống
  const existingAdmin = await Admin.findOne({ username: 'admin' });
  if (!existingAdmin) {
    // Nếu không có, tạo tài khoản admin mặc định
    const defaultAdmin = new Admin({
      username: 'admin',
      password: 'admin123', // Sử dụng mật khẩu mặc định
      role: 'admin'
    });

    // Lưu tài khoản admin vào cơ sở dữ liệu
    await defaultAdmin.save();
    console.log('Default admin account created successfully');
  } else {
    console.log('Admin account already exists');
  }
}

async function connect() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URL,);

    // Kiểm tra kết nối thành công
    if (mongoose.connection.readyState === 1) {
      console.log('Database - Connect successfully !!!');
    }

    // Tạo tài khoản admin mặc định nếu chưa có
    await createDefaultAdmin();

  } catch (error) {
    console.log('Database - Connection failure', error.message);
  }
}

module.exports = { connect };
