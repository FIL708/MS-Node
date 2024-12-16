const { validationResult } = require("express-validator");
const Product = require("../models/product.model");
const log = require("../utils/logger");

const getAddProduct = async (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add products",
        path: "/admin/add-product",
        editing: false,
        hasErrors: false,
        errorMsg: null,
        validationErrors: [],
    });
};

const postAddProduct = async (req, res) => {
    const { session, body } = req;
    const { title, price, description, imageUrl } = body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Add product",
            path: "/admin/add-product",
            editing: false,
            hasErrors: true,
            product: {
                title,
                price,
                description,
                imageUrl,
            },
            errorMsg: errors.array()[0].msg,
            validationErrors: errors.array(),
        });
    }

    const product = new Product({
        title,
        price,
        description,
        imageUrl,
        userId: session.user._id,
    });

    try {
        await product.save();
        res.redirect("/admin/products");
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const getEditProduct = async (req, res) => {
    const { edit } = req.query;
    const { productId } = req.params;
    if (!edit) {
        res.redirect("/");
    }
    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.redirect("/");
        }

        res.render("admin/edit-product", {
            pageTitle: "Edit products",
            path: "/admin/edit-product",
            editing: edit,
            product,
            hasErrors: false,
            errorMsg: null,
            validationErrors: [],
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

const postEditProduct = async (req, res) => {
    const { productId, title, imageUrl, price, description } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Add product",
            path: "/admin/edit-product",
            editing: false,
            hasErrors: true,
            product: {
                title,
                price,
                description,
                imageUrl,
                _id: productId,
            },
            errorMsg: errors.array()[0].msg,
            validationErrors: errors.array(),
        });
    }

    try {
        const product = await Product.findById(productId);

        if (productId.userId.toString() !== req.user._id.toString()) {
            return res.redirect("/");
        }

        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.description = description;

        await product.save();
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }

    res.redirect("/admin/products");
};

const postDeleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await Product.deleteOne({ _id: productId, userId: req.user._id });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
    res.redirect("/admin/products");
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user._id });

        res.render("admin/products", {
            pageTitle: "Admin Products",
            products,
            path: "/admin/products",
            hasErrors: false,
        });
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
};

module.exports = {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
    getProducts,
};
