import db from "../models/index.js";
const getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render("homepage", { data: JSON.stringify(data) });

    } catch (e) {
        console.log(e);
    }

};
const setHomepage2 = (req, res) => {
    return res.send("Hello from homeController222!");
};



export { getHomepage, setHomepage2 };
