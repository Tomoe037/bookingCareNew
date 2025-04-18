import db from "../models/index.js";
import bcrypt from "bcryptjs";
import sequelizePkg from "sequelize";
import bodyParserPkg from "body-parser";
const { Op, where } = sequelizePkg;
const { raw } = bodyParserPkg;
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
const handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      // Tìm user trực tiếp mà không cần checkUserEmail
      const user = await db.User.findOne({
        where: { email: email },
        attributes: ["email", "roleId", "password"],
        raw: true,
      });

      if (!user) {
        userData.errCode = 1;
        userData.errMessage = "Your email does not exist in the system";
        return resolve(userData);
      }

      // So sánh mật khẩu (dùng bcrypt.compare thay vì compareSync để tránh chặn event loop)
      let check = await bcrypt.compare(password, user.password);

      if (check) {
        userData.errCode = 0;
        userData.errMessage = "ok";
        // console.log("user data", userData);
        // console.log("user ", userData.user);
        userData.user = user;
        delete user.password;
      } else {
        userData.errCode = 3;
        userData.errMessage = "Wrong password";
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      console.error("❌ Lỗi trong getAllUsers:", e);
      reject(e);
    }
  });
};

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "your email is already in use, plz try another email",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      console.log("from service");
      console.log(data);
      console.log("password: ", data.password);
      console.log("hashPasswordFromBcrypt : ", hashPasswordFromBcrypt);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = parseInt(userId, 10);
      if (isNaN(id)) {
        return resolve({
          errCode: 1,
          errMessage: "ID không hợp lệ",
        });
      }

      let user = await db.User.findOne({
        where: { id },
      });

      console.log("Found user: ", user);

      if (!user) {
        return resolve({
          errCode: 2,
          errMessage: `Người dùng không tồn tại`,
        });
      }

      await db.User.destroy({ where: { id } });

      return resolve({
        errCode: 0,
        errMessage: `Người dùng đã bị xóa`,
      });
    } catch (error) {
      console.error("Lỗi trong deleteUser:", error);
      return reject(error);
    }
  });
};
const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua co id de sua",
        });
      }
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phoneNumber = data.phoneNumber;
        user.address = data.address;
        user.gender = data.gender;
        await user.save();

        resolve({
          errCode: 0,
          errMessage: "sua nguoi dung thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "nguoi dung khong ton tai",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export {
  handleUserLogin,
  checkUserEmail,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
