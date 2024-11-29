const ItemService = require('../services/ItemService');

class ItemController {
  // API tạo món ăn mới
  create = async (req, res, next) => {
    try {
      const { name, description, price, availability, category_id } = req.body;
      const image = req.file ? req.file.path : null; // Nếu có ảnh thì lưu đường dẫn

      const data = { name, description, price, availability, category_id, image };
      const item = await ItemService.create(data);

      res.status(201).json({
        status: 'success',
        data: item,
      });
    } catch (error) {
      next(error);
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


  // API lấy tất cả món ăn
  getAll = async (req, res, next) => {
    try {
      const items = await ItemService.getAll();
      res.status(200).json({
        status: 'success',
        data: items,
      });
    } catch (error) {
      next(error);
    }
  };

  // API lấy món ăn theo id
  getById = async (req, res, next) => {
    try {
      const item = await ItemService.getById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

  // API xóa món ăn
  delete = async (req, res, next) => {
    try {
      const item = await ItemService.delete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Item deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ItemController();
