const { Router } = require("express");
const {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
} = require("../controllers/shop.controller");

module.exports = Router()
    .get("/", getIndex)
    .get("/products", getProducts)
    .get("/cart", getCart)
    .get("/checkout", getCheckout);
