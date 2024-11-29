// controllers/AuthController.js
const AuthService = require('../services/AuthService');
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require("bcrypt");
const Admin = require('../models/Admin');
class AuthController {
  // Đăng ký tài khoản mới
  static register = async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;

      // Kiểm tra trùng lặp tài khoản
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: true, message: "Tên đăng nhập đã tồn tại" });
      }

      // Hash mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Tạo user mới
      const newUser = new User({ username, email, password: hashedPassword, phone });
      const savedUser = await newUser.save();

      res.status(201).json({ message: "Đăng ký thành công", user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
    }
  };

  // Đăng nhập
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Tìm kiếm user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: true, message: "Tên đăng nhập không tồn tại" });
      }
  
      // So sánh mật khẩu
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json({ error: true, message: "Sai mật khẩu" });
      }
  
      if (user && validPassword) {
        // Tạo access token
        const accessToken = jwt.sign(
          {
            id: user.id,
            Admin: user.admin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1d" } // Thời gian hết hạn access token
        );
  
        // Tạo refresh token
        const refreshToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_REFRESH_KEY,
          { expiresIn: "7d" } // Thời gian hết hạn refresh token
        );
  
        // Lưu refresh token vào cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,       // Ngăn JavaScript phía client truy cập cookie
            secure: false,        // Tắt chế độ Secure vì localhost không chạy HTTPS
            sameSite: "Lax",      // Bảo vệ cơ bản chống CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian hết hạn: 7 ngày
          });
  
        // Lưu refresh token vào cơ sở dữ liệu
        user.refreshTokens.push(refreshToken);
        await user.save();
  
        // Trả về thông tin user (ẩn mật khẩu) và access token
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
    }
  };
  

  static refresh = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken; // Lấy token từ cookie
  
      if (!refreshToken) {
        return res.status(401).json({ error: true, message: "Không có refresh token" });
      }
  
      // Kiểm tra token trong cơ sở dữ liệu
      const user = await User.findOne({ refreshTokens: refreshToken });
      if (!user) {
        return res.status(403).json({ error: true, message: "Refresh token không hợp lệ hoặc đã bị thu hồi" });
      }
  
      // Xác thực refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: true, message: "Refresh token không hợp lệ" });
        }
  
        // Tạo access token mới
        const accessToken = AuthService.generateAccessToken(user);
        res.status(200).json({ accessToken });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
    }
  };
  

    // Đăng xuất (logout)
    static logout = async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken; // Lấy token từ cookie
            
            if (!refreshToken) {
                return res.status(400).json({ error: true, message: "Không có refresh token" });
            }

            // Xóa token khỏi cơ sở dữ liệu
            const user = await User.findOne({ refreshTokens: refreshToken });
            if (!user) {
                return res.status(404).json({ error: true, message: "Người dùng không tồn tại" });
            }

            // Cập nhật lại danh sách refreshTokens, xóa token tương ứng
            user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
            await user.save();

            // Xóa cookie
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            res.status(200).json({ message: "Đăng xuất thành công" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
        }
    };
  
}

module.exports = AuthController;
