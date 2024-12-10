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
const {
    postSignupValidator,
    postLoginValidator,
} = require("../validators/auth.validator");

module.exports = Router()
    .get("/login", getLogin)
    .post("/login", postLoginValidator, postLogin)
    .post("/logout", postLogout)
    .get("/signup", getSignup)
    .post("/signup", postSignupValidator, postSignup)
    .get("/reset", getReset)
    .post("/reset", postReset)
    .get("/new-password/:token", getNewPassword)
    .post("/new-password", postNewPassword);
