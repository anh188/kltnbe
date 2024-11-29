const CategoryService = require('../services/CategoryService');

class CategoryController {
  // API để tạo danh mục
  create = async (req, res) => {
    try {
      const { name, description } = req.body;
      let data = { name, description };
      
      const category = await CategoryService.create(data);

      res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating category',
        error: error.message,
      });
    }
  };

  // API để lấy danh sách danh mục
  getAll = async (req, res) => {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).json({
        categories,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching categories',
        error: error.message,
      });
    }
  };
}

module.exports = new CategoryController();
