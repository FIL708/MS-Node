const path = require("path");

const rootDir = require("../utils/path");

const { Router } = require("express");

const products = [];

exports.router = Router()
    .get("/add-product", (req, res) => {
        res.sendFile(path.join(rootDir, "views", "add-product.html"));
    })
    .post("/add-product", (req, res) => {
        products.push({ title: req.body.title });
        res.redirect("/");
    });
exports.products = products;
