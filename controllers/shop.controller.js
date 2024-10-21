const Product = require("../models/product.model");

const getShop = (req, res) => {
    const products = Product.getAll((products) => {
        console.log(products);
        res.render("shop", { pageTitle: "Shop", products, path: "/" });
    });
};

module.exports = { get: getShop };
