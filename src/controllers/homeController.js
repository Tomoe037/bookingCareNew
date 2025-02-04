
const getHomepage = (req, res) => {
    return  res.render("homepage"); 
};
const setHomepage2 = (req, res) => {
    return res.send("Hello from homeController222!");
};

// export { getHomepage };

export { getHomepage, setHomepage2 };
// module.exports = {
//     getHomePage,
//     setHomepage2
// }