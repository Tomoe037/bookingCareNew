import db from "../models/index.js";
import { createdNewUser } from "../services/CRUDService.js"
const getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
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



export { getHomepage, getCRUD, postCRUD };
