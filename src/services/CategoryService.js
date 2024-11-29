const Category = require('../models/Category');

class CategoryService {
  // Hàm tạo mới danh mục
  create = async (dataCategory) => {
    try {
      const category = new Category(dataCategory);
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  };

  // Hàm lấy danh sách tất cả các danh mục
  getAll = async () => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();
