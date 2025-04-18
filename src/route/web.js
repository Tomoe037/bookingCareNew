import express from "express";
import {
  getHomepage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
  
} from "../controllers/homeController.js";
import {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser
} from "../controllers/userController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  // router.get('/', (req, res) => {
  //     return res.send('hello nhu nhu')
  // });
  // router.get('/', (req, res) => {
  //     res.render("homepage");
  // });
  router.get("/", getHomepage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.post("/put-crud", putCRUD);
  router.get("/delete-crud", deleteCRUD);
  router.post("/api/login", handleLogin);
  router.get("/api/get-all-users", handleGetAllUser);
  router.post("/api/create-new-user", handleCreateNewUser);
  router.put("/api/edit-user", handleEditUser);
  router.delete("/api/delete-user", handleDeleteUser);
  return app.use("/", router);
};

export default initWebRoutes;
