require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");

const routes = require("./routes");
const { getNotFound, get500 } = require("./controllers/error.controller");
const log = require("./utils/logger");
const User = require("./models/user.model");

const { PORT, MONGO_URL } = process.env;

const app = express();

const store = new MongoDBStore({ uri: MONGO_URL, collection: "sessions" });

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
    session({
        secret: "some-secret",
        resave: false,
        saveUninitialized: false,
        store,
    })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrf = req.csrfToken();
    next();
});

app.use(async (req, res, next) => {
    const { session } = req;

    if (!session.user || !session.isLoggedIn) {
        return next();
    }
    try {
        const user = await User.findById(session.user._id);
        if (!user) {
            return next();
        }

        req.user = user;

        next();
    } catch (error) {
        throw new Error(error);
    }
});

app.use(routes);

app.get("/500", get500);

app.use(getNotFound);

app.use((req, res) => {
    res.status(500).render("500", {
        pageTitle: "Error!",
        path: "/500",
        isAuthenticated: req.session.isLoggedIn,
    });
});

(async () => {
    try {
        await mongoose.connect(MONGO_URL);

        log(
            "Database connection has been established successfully.",
            "success"
        );

        app.listen(PORT, () => {
            log(`Server is listening on port ${PORT}`, "info");
            log(`http://localhost:${PORT}`, "info");
        });
    } catch (error) {
        log(error, "error");
        res.redirect("/500");
    }
})();
