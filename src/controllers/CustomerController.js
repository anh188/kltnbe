// controllers/CustomerController.js
const CustomerService = require("../services/CustomerService");

class CustomerController {
    // API POST để tạo khách hàng mới
    create = async (req, res) => {
        try {
            const { username, email, password, phone, address } = req.body;

            // Kiểm tra các trường thông tin có đầy đủ không
            if (!username || !email || !password || !phone || !address) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Tạo object dữ liệu cho khách hàng mới
            let data = {
                username, email, password, phone, address
            };

            // Gọi hàm create của CustomerService để tạo khách hàng và lưu vào DB
            const customer = await CustomerService.create(data);

            // Trả về thông tin khách hàng mới tạo
            res.status(200).json({
                message: "Customer created successfully",
                customer,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
}

module.exports = new CustomerController();