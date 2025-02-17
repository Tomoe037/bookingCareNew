import express from "express";
import { getHomepage, getCRUD, postCRUD, displayGetCRUD } from "../controllers/homeController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send('hello nhu nhu')
    // });
    // router.get('/', (req, res) => {
    //     res.render("homepage");
    // });
    router.get('/', getHomepage);
    router.get('/crud', getCRUD);
    router.post('/post-crud', postCRUD);
    router.get('/get-crud', displayGetCRUD);



    return app.use("/", router);
}

export default initWebRoutes;