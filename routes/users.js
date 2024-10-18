const { Router } = require("express");
const { usersData } = require("./add-user");

module.exports = Router().get("/", (req, res) => {
    console.log(usersData);
    res.render("users", { pageTitle: "Users", activePage: "users", usersData });
});
