const { Router } = require("express");
const {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
} = require("../controllers/admin.controller");

module.exports = Router()
    .get("/add-product", getAddProduct)
    .post("/add-product", postAddProduct)
    .get("/edit-product/:productId", getEditProduct)
    .post("/edit-product", postEditProduct)
    .post("/delete-product/:productId", postDeleteProduct)
    .get("/products", getProducts);
