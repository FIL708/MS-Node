const { Router } = require("express");
const {
    getAddProduct,
    getProducts,
    postAddProduct,
} = require("../controllers/admin.controller");

module.exports = Router()
    .get("/add-product", getAddProduct)
    .post("/add-product", postAddProduct)
    .get("/products", getProducts);
