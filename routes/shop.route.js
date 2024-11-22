const { Router } = require("express");
const {
    getProducts,
    getIndex,
    getCart,
    postCart,
    postCartDeleteItem,
    getCheckout,
    getOrders,
    getProduct,
    postOrder,
} = require("../controllers/shop.controller");

module.exports = Router()
    .get("/", getIndex)
    .get("/products", getProducts)
    .get("/products/:productId", getProduct)
    .get("/cart", getCart)
    .post("/cart", postCart)
    .post("/cart-delete-item/:productId", postCartDeleteItem)
    .get("/checkout", getCheckout)
    .get("/orders", getOrders)
    .post("/create-order", postOrder);
