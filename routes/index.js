const { Router } = require("express");

const admin = require("./admin.route");
const shop = require("./shop.route");
const auth = require("./auth.route");

module.exports = Router().use("/admin", admin).use(shop).use(auth);
