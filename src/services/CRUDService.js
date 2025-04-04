import bcrypt from "bcryptjs";
import db from "../models/index.js";
import pkg from "sequelize";
import { resolve } from "path";
import { rejects } from "assert";
const { where } = pkg;


const salt = bcrypt.genSaltSync(10);
const createdNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("ok create new user success!");
    } catch (e) {
      reject(e);
    }
  });
};
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
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateUserData = (userDataUpdate) => {
  // console.log("data from service")
  // console.log(userData);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userDataUpdate.id },
        raw: false,
      });
      if (user) {
        user.firstName = userDataUpdate.firstName;
        user.lastName = userDataUpdate.lastName;
        user.phoneNumber = userDataUpdate.phoneNumber;
        user.address = userDataUpdate.address;
        user.gender = userDataUpdate.gender;
        await user.save();
        const allUsers = db.User.findAll();

        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export {
  createdNewUser,
  hashUserPassword,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
