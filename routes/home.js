const { Router } = require("express");

module.exports = Router().get("/", (req, res) => {
    res.render("home", { pageTitle: "Home", activePage: "home" });
});
