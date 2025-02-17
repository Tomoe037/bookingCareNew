import db from "../models/index.js";
import { createdNewUser, getAllUser } from "../services/CRUDService.js"
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
    console.log("--------------");
    console.log(data);
    console.log("--------------");
    return res.render("displayCRUD.ejs",{
        dataTable : data
    });
}



export { getHomepage, getCRUD, postCRUD, displayGetCRUD };
