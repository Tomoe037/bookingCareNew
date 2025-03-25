import db from "../models/index.js";
import {
  createdNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
} from "../services/CRUDService.js";
const getHomepage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log(data);
    return res.render("homepage", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
const postCRUD = async (req, res) => {
  let message = await createdNewUser(req.body);
  console.log(message);
  return res.send("post-crud");
};
const displayGetCRUD = async (req, res) => {
  let data = await getAllUser();
  // console.log("--------------");
  // console.log(data);
  // console.log("--------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
const getEditCRUD = async (req, res) => {
  // console.log(req.query.id);
  const userId = req.query.id;
  if (userId) {
    const userData = await getUserInfoById(userId);
    // console.log("userdata --------");
    // console.log(userData);
    // console.log("---------------------");
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("not found");
  }
};
const putCRUD = async (req, res) => {
  const data = req.body;
  console.log("dataputcrud :", data);
  const allUsers = await updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};
const deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await deleteUserById(userId);
    return res.send("delete the user succes");
  } else {
    return res.send("user not found");
  }
};

export {
  getHomepage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
