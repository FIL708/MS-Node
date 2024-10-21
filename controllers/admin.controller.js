const Product = require("../models/product.model");

const getAddProduct = (req, res) => {
    res.render("admin/add-product", {
        pageTitle: "Add products",
        path: "/admin/add-product",
    });
};
const postAddProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
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

module.exports = { getAddProduct, postAddProduct, getProducts };
