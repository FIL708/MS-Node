const { Router } = require("express");
const productController = require("../controllers/products.controller");

module.exports = Router()
    .get("/add-product", productController.get)
    .post("/add-product", productController.post);
