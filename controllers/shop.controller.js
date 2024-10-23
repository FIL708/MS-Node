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

const getProduct = (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    Product.get(productId, (product) => console.log(product));
};

const getIndex = (req, res) => {
    Product.getAll((products) => {
        res.render("shop/index", {
            pageTitle: "Shop",
            products,
            path: "/",
        });
    });
};
const getCart = (req, res) => {
    res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
    });
};
const getCheckout = (req, res) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};

const getOrders = (req, res) => {
    res.render("shop/orders", {
        pageTitle: "Your orders",
        path: "/orders",
    });
};

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProduct,
};
