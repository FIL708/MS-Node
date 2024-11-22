const Order = require("../models/order.model");
const Product = require("../models/product.model");
const log = require("../utils/logger");

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

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
        const product = await Product.findByPk(productId);

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
        const products = await Product.findAll();

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
        const cart = await user.getCart();
        const productsInCart = await cart.getProducts();
        res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
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
        const cart = await user.getCart();
        const product = await Product.findByPk(productId);
        const productInCart = await cart.getProducts({
            where: { id: productId },
        });
        const newQuantity =
            productInCart.length > 0
                ? productInCart[0].cartItem.quantity + 1
                : 1;

        await cart.addProduct(product, { through: { quantity: newQuantity } });

        res.redirect("/cart");
    } catch (error) {
        log(error, "error");
    }
};

const postCartDeleteItem = async (req, res) => {
    const { productId } = req.params;
    const { user } = req;

    try {
        const cart = await user.getCart();
        const products = await cart.getProducts({ where: { id: productId } });
        const product = products[0];

        await product.cartItem.destroy();

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
        const orderedProducts = await user.getOrders({ include: ["products"] });

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
        const cart = await user.getCart();
        const productsInCart = await cart.getProducts();

        const newOrder = await user.createOrder();

        await newOrder.addProducts(
            productsInCart.map((product) => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            })
        );

        await cart.setProducts(null);

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
    getCheckout,
    getOrders,
    getProduct,
    postOrder,
};
