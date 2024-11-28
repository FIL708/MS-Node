require("dotenv").config();

const express = require("express");

const routes = require("./routes");
const { getNotFound } = require("./controllers/error.controller");
const log = require("./utils/logger");
const User = require("./models/user.model");
const mongoose = require("mongoose");

const { PORT, MONGO_URL } = process.env;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(async (req, res, next) => {
    try {
        const user = await User.findOne({ name: "test-user" });
        req.user = user;
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


(async () => {
    try {
        await mongoose.connect(MONGO_URL);

        log(
            "Database connection has been established successfully.",
            "success"
        );

        const user = await User.findOne({ name: "test-user" });
        
        if (!user) {
            await new User({
                name: "test-user",
                email: "test@user.com",
            }).save();
        }

        app.listen(PORT, () => {
            log(`Server is listening on port ${PORT}`, "info");
            log(`http://localhost:${PORT}`, "info");
        });
    } catch (error) {
        log(error, "error");
    }
})();
