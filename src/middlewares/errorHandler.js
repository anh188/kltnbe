// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;  // Mặc định lỗi là 500 nếu không có statusCode
  
    // Ghi log lỗi (thường sẽ ghi vào file log, ở đây chỉ in ra console)
    console.error(err.stack);
  
    // Trả về lỗi cho client
    res.status(err.statusCode).json({
      status: 'error',
      errorStatusCode: err.statusCode,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack  // Chỉ hiển thị stack trace khi ở môi trường dev
    });
  };
  
  module.exports = errorHandler;
  