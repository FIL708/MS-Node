const path = require("path");

const rootDir = require("../utils/path");

const { Router } = require("express");

module.exports = Router()
    .get("/add-product", (req, res) => {
        res.sendFile(path.join(rootDir, "views", "add-product.html"));
    })
    .post("/add-product", (req, res) => {
        console.log(req.body);
        res.redirect("/");
    });
