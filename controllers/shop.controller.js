const Cart = require("../models/cart.model");
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
    Product.get(productId, (product) => {
        res.render("shop/product-details", {
            product,
            pageTitle: product.title,
            path: "/products",
        });
    });
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
    Cart.getCart((cart) => {
        Product.getAll((products) => {
            const cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find(
                    (prod) => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        quantity: cartProductData.quantity,
                    });
                }
            }

            res.render("shop/cart", {
                pageTitle: "Your Cart",
                path: "/cart",
                products: cartProducts,
            });
        });
    });
};

const postCart = (req, res) => {
    const { productId } = req.body;
    Product.get(productId, (product) => {
        Cart.addProduct({ id: product.id, productPrice: product.price });
    });
    res.redirect("/cart");
};

const postCartDeleteItem = (req, res) => {
    const { productId } = req.params;
    Product.get(productId, (product) => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart')
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
    postCart,
    postCartDeleteItem,
    getCheckout,
    getOrders,
    getProduct,
};
