const Product = require("../models/product.model");
const log = require("../utils/logger");

const getAddProduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add products",
        path: "/admin/add-product",
        editing: false,
    });
};

const postAddProduct = async (req, res) => {
    const { user, body } = req;
    const { title, price, description, imageUrl } = body;
    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        null,
        user._id
    );
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
        });
    } catch (error) {
        log(error, "error");
    }
};

const postEditProduct = async (req, res) => {
    const { productId, title, imageUrl, price, description } = req.body;

    try {
        await new Product(
            title,
            price,
            description,
            imageUrl,
            productId
        ).save();
    } catch (error) {
        log(error, "error");
    }

    res.redirect("/admin/products");
};

const postDeleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await Product.deleteById(productId);
    } catch (error) {
        log(error, "error");
    }
    res.redirect("/admin/products");
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        res.render("admin/products", {
            pageTitle: "Admin Products",
            products,
            path: "/admin/products",
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
