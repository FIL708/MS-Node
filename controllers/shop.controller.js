const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getProducts = (req, res) => {
    Product.getAll()
        .then(([products]) => {
            res.render("shop/products", {
                pageTitle: "Products",
                products,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

const getProduct = (req, res) => {
    const { productId } = req.params;
    Product.get(productId)
        .then(([product]) => {
            res.render("shop/product-details", {
                product: product[0],
                pageTitle: product[0].title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

const getIndex = (req, res) => {
    Product.getAll()
        .then(([rows, fieldData]) => {
            res.render("shop/index", {
                pageTitle: "Shop",
                products: rows,
                path: "/",
            });
        })
        .catch((err) => console.log(err));
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
        res.redirect("/cart");
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
