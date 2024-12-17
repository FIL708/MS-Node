const { Router } = require("express");
const {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
} = require("../controllers/admin.controller");
const isAuth = require("../middleware/is-auth.middleware");
const { postProductValidator } = require("../validators/admin.validator");
const uploadImageMiddleware = require("../middleware/upload-image.middleware");

module.exports = Router()
    .use(isAuth)
    .get("/add-product", getAddProduct)
    .post(
        "/add-product",
        postProductValidator,
        uploadImageMiddleware("image"),
        postAddProduct
    )
    .get("/edit-product/:productId", getEditProduct)
    .post("/edit-product", postProductValidator, postEditProduct)
    .post("/delete-product/:productId", postDeleteProduct)
    .get("/products", getProducts);
