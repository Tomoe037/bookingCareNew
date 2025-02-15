import bcrypt from "bcryptjs";
import db from "../models/index.js";
const salt = bcrypt.genSaltSync(10);
const createdNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
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
    })

}
const hashUserPassword = (password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);

        }

    })
}
export { createdNewUser, hashUserPassword };