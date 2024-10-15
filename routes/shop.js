const path = require("path");
const { Router } = require("express");
const { products } = require("./admin");

const rootDir = require("../utils/path");

module.exports = Router().get("/", (req, res) => {
    console.log(products);
    res.sendFile(path.join(rootDir, "views", "shop.html"));
});
