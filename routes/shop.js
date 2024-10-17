const { Router } = require("express");
const { products } = require("./admin");

module.exports = Router().get("/", (req, res) => {
    console.log(products);
    res.render("shop", {
        pageTitle: "My Shop",
        path: "/",
        products,
        hasProducts: products.length > 0,
        activeShop: true,
    });
});
