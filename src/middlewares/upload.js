const multer = require('multer');
const path = require('path');

// Định nghĩa nơi lưu ảnh và cách đặt tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Lưu ảnh vào thư mục uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên file sẽ là timestamp kèm đuôi file gốc
  },
});

const fileFilter = (req, file, cb) => {
  // Kiểm tra loại file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Nếu là ảnh, cho phép upload
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG and JPG are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn dung lượng file lên đến 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
