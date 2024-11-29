const mongoose = require('mongoose');

// Định nghĩa schema cho danh mục
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên danh mục
  description: { type: String, required: false } // Mô tả danh mục
});

// Tạo mô hình Category từ schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
