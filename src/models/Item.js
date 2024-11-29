const mongoose = require('mongoose');

// Định nghĩa schema cho món ăn với các trường: name, description, price, availability, category_id, image
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: String, required: true }, // Sử dụng Decimal128 để lưu giá chính xác
  availability: { type: Boolean, default: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Tham chiếu tới Category
  image: { type: String, required: false } // Trường ảnh (URL ảnh)
}, { timestamps: true }); // Tự động tạo các trường createdAt và updatedAt

// Tạo mô hình Item từ schema
const Item = mongoose.model('Item', itemSchema);

// Xuất mô hình Item ra để sử dụng ở nơi khác
module.exports = Item;
