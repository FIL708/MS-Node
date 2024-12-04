const { Router } = require("express");
const {
    getProducts,
    getIndex,
    getCart,
    postCart,
    postCartDeleteItem,
    // getCheckout,
    getOrders,
    getProduct,
    postOrder,
} = require("../controllers/shop.controller");
const isAuth = require("../middleware/is-auth.middleware");

module.exports = Router()
    .get("/", getIndex)
    .get("/products", getProducts)
    .get("/products/:productId", getProduct)
    .get("/cart", isAuth, getCart)
    .post("/cart", isAuth, postCart)
    .post("/cart-delete-item/:productId", isAuth, postCartDeleteItem)
    .get("/orders", isAuth, getOrders)
    .post("/create-order", isAuth, postOrder);
