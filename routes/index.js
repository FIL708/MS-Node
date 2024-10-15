const { Router } = require("express");

const admin = require("./admin");
const shop = require("./shop");

module.exports = Router().use("/admin", admin).use(shop);
