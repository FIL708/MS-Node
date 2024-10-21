const Product = require("../models/product.model");

const getProducts = (req, res) => {
    Product.getAll((products) => {
        res.render("shop/products", {
            pageTitle: "Shop",
            products,
            path: "/products",
        });
    });
};

const getIndex = (req, res) => {
    res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
    });
};
const getCart = (req, res) => {
    res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
    });
};
const getCheckout = (req, res) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};

module.exports = { getProducts, getIndex, getCart, getCheckout };
