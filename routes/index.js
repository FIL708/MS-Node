const { Router } = require("express");

const admin = require("./admin.route");
const shop = require("./shop.route");

module.exports = Router().use("/admin", admin).use(shop);
