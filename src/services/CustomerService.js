const Customer = require("../models/Customer");

class CustomerService {
    // Hàm tạo khách hàng mới
    create = async (dataCustomer) => {
        try {
            const customer = new Customer(dataCustomer);
            await customer.save(); // Lưu khách hàng vào MongoDB
            return customer;
        } catch (error) {
            throw error; // Nếu có lỗi xảy ra, ném lỗi để xử lý ở Controller
        }
    };
}

module.exports = new CustomerService();