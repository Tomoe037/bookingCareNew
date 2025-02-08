import express from "express";
import { getHomepage, setHomepage2 } from "../controllers/homeController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send('hello nhu nhu')
    // });
    router.get('/',getHomepage);
    // router.get('/', (req, res) => {
    //     res.render("homepage");
    // });


    router.get('/nhu',setHomepage2);




    return app.use("/", router);
}

export default initWebRoutes;