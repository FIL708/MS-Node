const { validationResult } = require("express-validator");
const Product = require("../models/product.model");
const log = require("../utils/logger");
const { deleteFile } = require("../utils/file");

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

const postAddProduct = async (req, res, next) => {
    const { session, body } = req;
    const { title, price, description } = body;
    const image = req.file;

    if (!image) {
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
            hasErrors: true,
            product: {
                title: title,
                price: price,
                description: description,
            },
            errorMsg: "Attached file is not an image.",
            validationErrors: [],
        });
    }

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
            },
            errorMsg: errors.array()[0].msg,
            validationErrors: errors.array(),
        });
    }

    const product = new Product({
        title,
        price,
        description,
        userId: session.user._id,
    });

    if (image) {
        product.imageUrl = image.path;
    }

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

const getEditProduct = async (req, res, next) => {
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

const postEditProduct = async (req, res, next) => {
    const { productId, title, price, description } = req.body;
    const image = req.file;

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
        product.price = price;
        product.description = description;
        if (image) {
            deleteFile(product.imageUrl);
            product.imageUrl = image.path;
        }

        await product.save();
    } catch (error) {
        log(error, "error");
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }

    res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        deleteFile(product.imageUrl);

        await Product.deleteOne({ _id: productId, userId: req.user._id });

        res.status(200).json({ message: "Product successfully deleted." });
    } catch (error) {
        log(error, "error");
        res.status(500).json({ message: "Deleting product failed" });
    }
};

const getProducts = async (req, res, next) => {
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
    deleteProduct,
    getProducts,
};
