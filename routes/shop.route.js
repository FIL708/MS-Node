const { Router } = require("express");
const shopController = require("../controllers/shop.controller");

module.exports = Router().get("/", shopController.get);
