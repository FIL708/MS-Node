const Product = require("../models/product.model");
const log = require("../utils/logger");

const getAddProduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add products",
        path: "/admin/add-product",
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
    });
};

const postAddProduct = async (req, res) => {
    const { session, body } = req;
    const { title, price, description, imageUrl } = body;
    const product = new Product({
        title,
        price,
        description,
        imageUrl,
        userId: session.user._id,
    });
    try {
        await product.save();
    } catch (error) {
        log(error, "error");
    }
    res.redirect("/admin/products");
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
            isAuthenticated: req.session.isLoggedIn,
        });
    } catch (error) {
        log(error, "error");
    }
};

const postEditProduct = async (req, res) => {
    const { productId, title, imageUrl, price, description } = req.body;

    try {
        const product = await Product.findById(productId);

        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.description = description;

        await product.save();
    } catch (error) {
        log(error, "error");
    }

    res.redirect("/admin/products");
};

const postDeleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await Product.findByIdAndDelete(productId);
    } catch (error) {
        log(error, "error");
    }
    res.redirect("/admin/products");
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.render("admin/products", {
            pageTitle: "Admin Products",
            products,
            path: "/admin/products",
            isAuthenticated: req.session.isLoggedIn,
        });
    } catch (error) {
        log(error, "error");
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
