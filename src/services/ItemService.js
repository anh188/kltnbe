const Item = require('../models/Item');
const Category = require('../models/Category');

class ItemService {
   // Hàm lấy tất cả món ăn
    getAll = async (id, data) => {
    return await Item.find().populate('category_id', 'name'); // Populate để lấy thông tin danh mục
}
// Tạo món ăn mới
create = async (data) => {
    try {
        // Kiểm tra xem món ăn đã tồn tại trong cơ sở dữ liệu chưa
        const existingItem = await Item.findOne({ name: data.name });
        if (existingItem) {
            // Nếu tên món ăn đã tồn tại, trả về lỗi
            throw new Error('Món ăn đã tồn tại');
        }

        // Kiểm tra xem danh mục có tồn tại không
        const category = await Category.findById(data.category_id);
        if (!category) {
            throw new Error('Danh mục không tồn tại');
        }

        // Tạo món ăn mới nếu tên chưa tồn tại và danh mục hợp lệ
        const item = new Item(data);
        await item.save();

        // Trả về món ăn đã tạo
        return item;

    } catch (error) {
        // Ném lỗi nếu có bất kỳ lỗi nào
        throw error;
    }
};

  // Cập nhật món ăn
  update = async (id, data) => {
    try {
      const item = await Item.findByIdAndUpdate(id, data, { new: true });
      if (!item) throw new Error('Item not found');
      return item;
    } catch (error) {
      throw error;
    }
  };

  // Các phương thức khác (getAll, getById, delete) không thay đổi
}

module.exports = new ItemService();
