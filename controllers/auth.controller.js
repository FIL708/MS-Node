const bcrypt = require("bcryptjs");
const { randomBytes } = require("node:crypto");

const User = require("../models/user.model");
const log = require("../utils/logger");
const sendMail = require("../utils/send-mail");

const getLogin = (req, res) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        errorMsg: req.flash("error"),
    });
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
        }

        req.session.isLoggedIn = true;
        req.session.user = user;
        await req.session.save();

        res.redirect("/");
    } catch (error) {
        log(error, "error");
    }
};

const postLogout = (req, res) => {
    req.session.destroy((error) => {
        log(error, "error");
        res.redirect("/");
    });
};

const getSignup = (req, res) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "Sign Up",
        errorMsg: req.flash("error"),
    });
};

const postSignup = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const isUserExisted = await User.findOne({ email });

        if (isUserExisted) {
            req.flash("error", "User already exists.");
            return res.redirect("/signup");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
        });

        await newUser.save();

        await sendMail({
            email,
            subject: "Signup",
            html: "<h1>Success signup</h1>",
        });

        res.redirect("/login");
    } catch (error) {
        log(error, "error");
    }
};

const getReset = (req, res) => {
    res.render("auth/reset", {
        path: "/reset",
        pageTitle: "Reset",
        errorMsg: req.flash("error"),
    });
};

const postReset = (req, res) => {
    const { email } = req.body;
    randomBytes(32, (error, buffer) => {
        if (error) {
            log(error, "error");
            return res.redirect("/reset");
        }

        const token = buffer.toString("hex");

        User.findOne({ email })
            .then((user) => {
                if (!user) {
                    req.flash("error", "No account with that email found");
                    return res.redirect("/reset");
                }

                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then((result) => {
                res.redirect("/");

                sendMail({
                    email,
                    subject: "Reset Password",
                    html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/new-password/${token}">link</a> to set a new password</p>
                    `,
                });
            })
            .catch((error) => log(error, "error"));
    });
};

const getNewPassword = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        res.render("auth/new-password", {
            path: "/new-password",
            pageTitle: "New password",
            errorMsg: req.flash("error"),
            userId: user._id.toString(),
            passwordToken: token,
        });
    } catch (error) {
        log(error, "error");
    }
};

const postNewPassword = async (req, res) => {
    const { userId, password, passwordToken } = req.body;
    
    try {
        const user = await User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId,
        });

        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword
        user.resetToken = null
        user.resetTokenExpiration = null

        await user.save()

        return res.redirect('/login')
    } catch (error) {
        log(error, "error");
    }
};

module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignup,
    postSignup,
    getReset,
    postReset,
    getNewPassword,
    postNewPassword,
};
