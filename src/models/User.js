// model/User.js
const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng với các trường: username, email, password, phone, address
const userSchema = new mongoose.Schema(
    {
      // Các trường hiện có
      username: { type: String, required: true, minlength: 6, maxlength: 20, unique: true },
      email: { type: String, required: true, minlength: 10, maxlength: 50, unique: true },
      password: { type: String, required: true, minlength: 6 },
      phone: { type: String, required: false },
      address: { type: String },
      admin: { type: Boolean, default: false },
  
      // Danh sách refresh token
      refreshTokens: { type: [String], default: [] },
    },
    { timestamps: true }
  );
// Tạo mô hình User từ schema
const User = mongoose.model('User', userSchema);

// Xuất mô hình User ra để sử dụng ở nơi khác
module.exports = User;