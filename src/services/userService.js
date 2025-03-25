import db from "../models/index.js";
import bcrypt from "bcryptjs";
import sequelizePkg from "sequelize";
import bodyParserPkg from "body-parser";
const { raw } = bodyParserPkg;
const { where } = sequelizePkg;

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

export { handleUserLogin, checkUserEmail };
