const User = require("../models/user.model");
const log = require("../utils/logger");

const getLogin = (req, res) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.session.isLoggedIn,
    });
};

const postLogin = async (req, res) => {
    try {
        const user = await User.findOne({ name: "test-user" });
        if (user) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            await req.session.save()
        }

        res.redirect("/");
    } catch (error) {
        log(ErrorEvent, "error");
    }
};

const postLogout = (req, res) => {
    req.session.destroy((error) => {
        log(error, "error");
        res.redirect("/");
    });
};

module.exports = { getLogin, postLogin, postLogout };
