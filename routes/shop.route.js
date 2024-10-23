const { Router } = require("express");
const {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProduct
} = require("../controllers/shop.controller");

module.exports = Router()
    .get("/", getIndex)
    .get("/products", getProducts)
    .get('/products/:productId', getProduct)
    .get("/cart", getCart)
    .get("/checkout", getCheckout)
    .get("/orders", getOrders)
