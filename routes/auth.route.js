const { Router } = require("express");
const {
    getLogin,
    postLogin,
    postLogout,
} = require("../controllers/auth.controller");

module.exports = Router()
    .get("/login", getLogin)
    .post("/login", postLogin)
    .post("/logout", postLogout);
