const { Router } = require("express");
const {
    getLogin,
    postLogin,
    postLogout,
    getSignup,
    postSignup,
    getReset,
    postReset,
    getNewPassword,
    postNewPassword,
} = require("../controllers/auth.controller");

module.exports = Router()
    .get("/login", getLogin)
    .post("/login", postLogin)
    .post("/logout", postLogout)
    .get("/signup", getSignup)
    .post("/signup", postSignup)
    .get("/reset", getReset)
    .post("/reset", postReset)
    .get("/new-password/:token", getNewPassword)
    .post("/new-password", postNewPassword);
