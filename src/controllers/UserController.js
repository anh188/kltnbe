const User = require("../models/User");
const UserService = require("../services/UserService");

class UserController {
    getMe = async (req, res) => {
        try {
          // Sử dụng `req.user.id` từ middleware verifyToken
          const user = await User.findById(req.user.id)// Ẩn trường mật khẩu
          if (!user) {
            return res.status(404).json({ error: true, message: "Không tìm thấy người dùng" });
          }
      
          res.status(200).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
        }
      };

    //get all users
    getAllUsers = async (req,res)=>{
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // // Cập nhật quyền admin cho người dùng
    // updateAdmin = async (req, res) => {
    //     try {
    //     const { id } = req.params; // ID người dùng cần cập nhật quyền admin
    //     const { admin } = req.body; // Thông tin quyền admin mới (true hoặc false)
    
    //     // Kiểm tra nếu người thực hiện là admin
    //     if (!req.user.isAdmin) {
    //         return res.status(403).json({ error: true, message: "Bạn không có quyền thay đổi quyền admin" });
    //     }
    
    //     // Tìm người dùng và cập nhật quyền admin
    //     const updatedUser = await User.findByIdAndUpdate(
    //         id,
    //         { admin },
    //         { new: true, runValidators: true }
    //     );
    
    //     if (!updatedUser) {
    //         return res.status(404).json({ error: true, message: "Không tìm thấy người dùng" });
    //     }
    
    //     res.status(200).json({
    //         message: "Cập nhật quyền admin thành công",
    //         user: updatedUser
    //     });
    //     } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
    //     }
    // };

    // // Sửa thông tin người dùng
    // updateUser = async (req, res) => {
    //     try {
    //       const { id } = req.params; // ID của user cần cập nhật
    //       const { username, email, password, phone, address } = req.body; // Thông tin cần cập nhật
      
    //       // Chỉ cập nhật các trường hợp cần thiết
    //       let updateData = { username, email, phone, address };
      
    //       // Hash mật khẩu mới nếu có
    //       if (password) {
    //         const bcrypt = require("bcrypt");
    //         const salt = await bcrypt.genSalt(10);
    //         updateData.password = await bcrypt.hash(password, salt);
    //       }
      
    //       // Tìm user và cập nhật
    //       const updatedUser = await User.findByIdAndUpdate(
    //         id,
    //         { $set: updateData }, // Chỉ cập nhật các trường hợp hợp lệ
    //         { new: true, runValidators: true } // Trả về dữ liệu mới sau khi cập nhật
    //       );
      
    //       if (!updatedUser) {
    //         return res.status(404).json({ error: true, message: "Không tìm thấy người dùng" });
    //       }
      
    //       res.status(200).json({ message: "Cập nhật thông tin thành công", user: updatedUser });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
    //     }
    //   };


    updateUserAndAdmin = async (req, res) => {
        try {
            const { id } = req.params;  // ID người dùng cần cập nhật
            const { username, email, password, phone, address, admin } = req.body; // Các thông tin cần cập nhật
    
            // Kiểm tra nếu người thực hiện là admin
            if (!req.user.isAdmin) {
                return res.status(403).json({ error: true, message: "Bạn không có quyền thay đổi quyền admin" });
            }
    
            // Chuẩn bị dữ liệu cập nhật
            let updateData = { username, email, phone, address };
    
            // Nếu có thay đổi mật khẩu, tiến hành hash mật khẩu mới
            if (password) {
                const bcrypt = require("bcrypt");
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(password, salt);
            }
    
            // Nếu có quyền admin được gửi trong body, thêm vào updateData
            if (typeof admin === 'boolean') {
                updateData.admin = admin;
            }
    
            // Cập nhật người dùng trong cơ sở dữ liệu
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: updateData },  // Chỉ cập nhật những trường hợp hợp lệ
                { new: true, runValidators: true }  // Trả về dữ liệu mới sau khi cập nhật
            );
    
            if (!updatedUser) {
                return res.status(404).json({ error: true, message: "Không tìm thấy người dùng" });
            }
    
            // Trả về kết quả sau khi cập nhật
            res.status(200).json({
                message: "Cập nhật thông tin người dùng thành công",
                user: updatedUser
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: true, message: "Lỗi server", details: error.message });
        }
    };

    //delete user
    deleteUser = async (req,res)=>{
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res .status(200).json("Xoá thành công")
        } catch (error) {
            
        }
    }

}

module.exports = new UserController();