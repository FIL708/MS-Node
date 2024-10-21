const Product = require("../models/product.model");

const getProducts = (req, res) => {
    res.render("add-product", {
        pageTitle: "Add products",
        path: "/admin/add-product",
    });
};
const postProducts = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

module.exports = { get: getProducts, post: postProducts };
