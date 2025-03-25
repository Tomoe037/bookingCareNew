import db from "../models/index.js";
import pkg from "sequelize";
import bcrypt from "bcryptjs";
const { where } = pkg;
const handleUserLogin = async (email, password) => {
  try {
    let userData = {};

    // Truy vấn database một lần để lấy user
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return {
        errCode: 1,
        errMessage: "Your email does not exist in the system",
      };
    }

    // So sánh mật khẩu bất đồng bộ
    let check = await bcrypt.compare(password, user.password);
    if (check) {
      return { errCode: 0, errMessage: "ok", user };
    } else {
      return { errCode: 3, errMessage: "Wrong password" };
    }
  } catch (error) {
    return { errCode: -1, errMessage: "Internal server error" };
  }
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
