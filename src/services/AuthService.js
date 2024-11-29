// services/AuthService.js
const jwt = require('jsonwebtoken');
// Thay đổi cách import
const bcrypt = require('bcryptjs');

const User = require('../models/User'); // Giả sử User là model của bảng người dùng

class AuthService {
  static async login(username, password) {
    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    // Tạo token JWT với SECRET_KEY_JWT
    const token = jwt.sign(
      { username: user.username, userId: user.id },
      process.env.SECRET_KEY_JWT,
      { expiresIn: '1h' }
    );

    return { token };
  }
  static generateAccessToken(user) {
    // Tạo access token với thông tin cần thiết
    return jwt.sign(
      {
        id: user.id,
        Admin: user.admin, // Thông tin phân quyền
      },
      process.env.JWT_ACCESS_KEY, // Secret key cho access token
      { expiresIn: "30m" } // Thời hạn token
    );
  }
}

module.exports = AuthService;
