const path = require("path");
const { Router } = require("express");

const rootDir = require("../utils/path");

module.exports = Router().get("/", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "shop.html"));
});
