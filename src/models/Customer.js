const mongoose = require('mongoose');

// Định nghĩa schema cho khách hàng với các trường: customer_id, username, password, email, phone, created_at, address
const customerSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true // Đảm bảo tên đăng nhập là duy nhất
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 // Đảm bảo mật khẩu có ít nhất 6 ký tự
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Đảm bảo email là duy nhất
    },
    phone: { 
        type: String, 
        required: true
    },
    created_at: { 
        type: Date, 
        default: Date.now // Thời gian tạo mặc định là thời điểm hiện tại
    },
    address: { 
        type: String, 
        required: true 
    }
});

// Tạo mô hình Customer từ schema
const Customer = mongoose.model('Customer', customerSchema);

// Xuất mô hình Customer ra để sử dụng ở nơi khác
module.exports = Customer;