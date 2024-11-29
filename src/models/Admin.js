const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Để mã hóa mật khẩu

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' } // Vai trò của admin
});

// Mã hóa mật khẩu trước khi lưu vào MongoDB
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Tạo mô hình Admin từ schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
