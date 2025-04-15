import { getAllUser } from "../services/CRUDService.js";
import { handleUserLogin, getAllUsers } from "../services/userService.js";

const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs para",
    });
  }
  let userData = await handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
const handleGetAllUser = async (req, res) => {
  const id = req.body.id; // all, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  console.log("👉 Received type:", id);
  const users = await getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
export { handleLogin, handleGetAllUser };
