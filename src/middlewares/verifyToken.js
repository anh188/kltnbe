const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: true, message: 'Token không được cung cấp' });
  }

  // Loại bỏ tiền tố "Bearer " nếu có
  token = token.replace(/^Bearer\s+/, '');

  // Xác minh token
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      const message =
        err.name === 'TokenExpiredError'
          ? 'Token đã hết hạn'
          : 'Token không hợp lệ';
      return res.status(401).json({ error: true, message });
    }

    // Gắn thông tin người dùng vào request
    req.user = {
      id: decoded.id,
      isAdmin: decoded.Admin,
    };

    // Tiếp tục xử lý request
    next();
  });
};

const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(403).json({ error: true, message: "Thông tin người dùng không hợp lệ" });
    }

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: true, message: "Bạn không có quyền thực hiện hành động này" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdminAuth };
