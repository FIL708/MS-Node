const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const Product = require("../models/product.model");
const log = require("../utils/logger");
const Order = require("../models/order");

const ITEMS_PER_PAGE = 6;

const getProducts = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const numberOfProducts = await Product.find().countDocuments();

        const products = await Product.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        res.render("shop/products", {
            pageTitle: "Products",
            products,
            path: "/products",
            pageAmount: numberOfProducts,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < numberOfProducts,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(numberOfProducts / ITEMS_PER_PAGE),
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const getProduct = async (req, res, next) => {
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
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const getIndex = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const numberOfProducts = await Product.find().countDocuments();

        const products = await Product.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        res.render("shop/index", {
            pageTitle: "Shop",
            products,
            path: "/",
            pageAmount: numberOfProducts,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < numberOfProducts,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(numberOfProducts / ITEMS_PER_PAGE),
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const getCart = async (req, res, next) => {
    const { user } = req;

    try {
        const { cart } = await user.populate("cart.items.productId");

        const productsInCart = cart.items;

        res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: productsInCart,
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const postCart = async (req, res, next) => {
    const { productId } = req.body;
    const { user } = req;

    try {
        const product = await Product.findById(productId);

        await user.addToCart(product);

        res.redirect("/cart");
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const postCartDeleteItem = async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;

    try {
        await user.deleteFromCart(productId);

        res.redirect("/cart");
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const getOrders = async (req, res, next) => {
    const { user } = req;
    try {
        const orders = await Order.find({ "user.userId": user._id });

        res.render("shop/orders", {
            pageTitle: "Your orders",
            path: "/orders",
            orders,
            isAuthenticated: req.session.isLoggedIn,
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const postOrder = async (req, res, next) => {
    const { user } = req;

    try {
        const { cart } = await user.populate("cart.items.productId");

        const productsInCart = cart.items.map((i) => {
            return { quantity: i.quantity, product: { ...i.productId._doc } };
        });

        await new Order({
            user: { email: user.email, userId: user._id },
            products: productsInCart,
        }).save();

        await user.clearCart();

        res.redirect("/orders");
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const getInvoice = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new Error("No order found."));
        }

        if (order.user.userId.toString() !== req.user._id.toString()) {
            return next(new Error("Unauthorized."));
        }

        const invoiceName = "invoice-" + orderId + ".pdf";
        const invoicePath = path.join("data", "invoices", invoiceName);

        const pdfDoc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'inline; filename="' + invoiceName + '"'
        );

        pdfDoc.pipe(fs.createWriteStream(invoicePath));

        pdfDoc.pipe(res);

        pdfDoc.fontSize(26).text("Invoice", {
            align: "center",
        });
        pdfDoc.fontSize(12).text("----------------", { align: "center" });

        let totalPrice = 0;

        order.products.forEach((prod) => {
            totalPrice += prod.quantity * prod.product.price;

            pdfDoc
                .fontSize(14)
                .text(
                    prod.product.title +
                        " - " +
                        prod.quantity +
                        " x " +
                        "$" +
                        prod.product.price
                );
        });
        pdfDoc.text("---");
        pdfDoc.text("Total Price: $" + totalPrice);

        pdfDoc.end();
    } catch (error) {
        log(error, "error");
        return next(error);
    }
};

const getCheckout = async (req, res, next) => {
    const { user } = req;

    try {
        const { cart } = await user.populate("cart.items.productId");

        const products = cart.items;

        const totalSum = products.reduce(
            (acc, curr) => acc + curr.productId.price * curr.quantity,
            0
        );

        res.render("shop/checkout", {
            path: "/checkout",
            pageTitle: "Checkout",
            products,
            totalSum,
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

module.exports = {
    getProducts,
    getIndex,
    getCart,
    postCart,
    postCartDeleteItem,
    getOrders,
    getProduct,
    postOrder,
    getInvoice,
    getCheckout,
};
