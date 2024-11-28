require("dotenv").config();

const express = require("express");

const routes = require("./routes");
const { getNotFound } = require("./controllers/error.controller");
const log = require("./utils/logger");
const User = require("./models/user.model");
const mongoConnect = require("./database/database").mongoConnect;

const { PORT } = process.env;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("67470c2e25af3a20e0014def");
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    } catch (error) {
        log(error, "error");
    }
});

app.use("/", (req, res, next) => {
    next();
});

app.use(routes);

app.use(getNotFound);

mongoConnect(() => {
    app.listen(PORT, () => {
        log(`Server is listening on port ${PORT}`, "info");
        log(`http://localhost:${PORT}`, "info");
    });
});
