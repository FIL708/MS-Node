const { Router } = require("express");

const products = [];

exports.router = Router()
    .get("/add-product", (req, res) => {
        res.render("add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            activeProducts: true,
        });
    })
    .post("/add-product", (req, res) => {
        products.push({ title: req.body.title });
        res.redirect("/");
    });
exports.products = products;
