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
    const { title, imageUrl, price, description } = body;

    try {
        await user.createProduct({
            title,
            imageUrl,
            price,
            description,
        });
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
        const product = await Product.findByPk(productId);

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
        await Product.update(
            { title, imageUrl, price, description },
            { where: { id: productId } }
        );
    } catch (error) {
        log(error, "error");
    }

    res.redirect("/admin/products");
};

const postDeleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        Product.destroy({ where: { id: productId } });
    } catch (error) {
        log(error, "error");
    }
    res.redirect("/admin/products");
};

const getProducts = async (req, res) => {
    try {
        const products = await req.user.getProducts();

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
