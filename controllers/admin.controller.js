const Product = require("../models/product.model");

const getAddProduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add products",
        path: "/admin/add-product",
        editing: false,
    });
};

const postAddProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product({
        id: null,
        title,
        imageUrl,
        description,
        price,
    });
    product.save();
    res.redirect("/admin/products");
};

const getEditProduct = (req, res) => {
    const { edit } = req.query;
    const { productId } = req.params;
    if (!edit) {
        res.redirect("/");
    }
    Product.get(productId, (product) => {
        if (!product) {
            return res.redirect("/");
        }

        res.render("admin/edit-product", {
            pageTitle: "Edit products",
            path: "/admin/edit-product",
            editing: edit,
            product,
        });
    });
};

const postEditProduct = (req, res) => {
    const { productId, title, imageUrl, price, description } = req.body;

    const updatedProduct = new Product({
        id: productId,
        title,
        imageUrl,
        price,
        description,
    });

    updatedProduct.save();

    res.redirect("/admin/products");
};

const postDeleteProduct = (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    Product.delete(productId);
    res.redirect("/admin/products");
};

const getProducts = (req, res) => {
    Product.getAll((products) => {
        res.render("admin/products", {
            pageTitle: "Admin Products",
            products,
            path: "/",
        });
    });
};

module.exports = {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
    getProducts,
};
