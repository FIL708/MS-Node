// const Order = require("../models/order.model");
const Product = require("../models/product.model");
const log = require("../utils/logger");

const getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        res.render("shop/products", {
            pageTitle: "Products",
            products,
            path: "/products",
        });
    } catch (error) {
        log(error, "error");
    }
};

const getProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        res.render("shop/product-details", {
            product,
            pageTitle: product.title,
            path: "/products",
        });
    } catch (error) {
        log(error, "error");
    }
};

const getIndex = async (req, res) => {
    try {
        const products = await Product.getAll();

        res.render("shop/index", {
            pageTitle: "Shop",
            products,
            path: "/",
        });
    } catch (error) {
        log(error, "error");
    }
};

const getCart = async (req, res) => {
    const { user } = req;
    try {
        const productsInCart = await user.getCart();

        res.render("shop/cart", {
            path: "cart",
            pageTitle: "Your Cart",
            products: productsInCart,
        });
    } catch (error) {
        log(error, "error");
    }
};

const postCart = async (req, res) => {
    const { productId } = req.body;
    const { user } = req;

    try {
        const product = await Product.findById(productId);

        await user.addToCart(product);

        res.redirect("/cart");
    } catch (error) {
        log(error, "error");
    }
};

const postCartDeleteItem = async (req, res) => {
    const { productId } = req.params;
    const { user } = req;

    try {
        await user.deleteFromCart(productId);

        res.redirect("/cart");
    } catch (error) {
        log(error, "error");
    }
};

const getCheckout = (req, res) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};

const getOrders = async (req, res) => {
    const { user } = req;
    try {
        const orderedProducts = await user.getOrders();

        res.render("shop/orders", {
            pageTitle: "Your orders",
            path: "/orders",
            orders: orderedProducts,
        });
    } catch (error) {
        log(error, "error");
    }
};

const postOrder = async (req, res) => {
    const { user } = req;

    try {
        await user.addOrder();

        res.redirect("/orders");
    } catch (error) {
        log(error, "error");
    }
};

module.exports = {
    getProducts,
    getIndex,
    getCart,
    postCart,
    postCartDeleteItem,
    // getCheckout,
    getOrders,
    getProduct,
    postOrder,
};
