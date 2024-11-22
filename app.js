require("dotenv").config();

const express = require("express");

const routes = require("./routes");
const { getNotFound } = require("./controllers/error.controller");
const sequelize = require("./database/database");
const User = require("./models/user.model");
const log = require("./utils/logger");
const initModelsAssociations = require("./database/associations");
const seedTestUser = require("./database/seedTestUser");

const { PORT } = process.env;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1);
        req.user = user;
    } catch (error) {
        log(error, "error");
    }

    next();
});

app.use("/", (req, res, next) => {
    next();
});

app.use(routes);

app.use(getNotFound);

initModelsAssociations();

(async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        await seedTestUser();

        app.listen(PORT, () => {
            log(`Server is listening on port ${PORT}`, "info");
            log(`http://localhost:${PORT}`, "info");
        });
    } catch (error) {
        log(error, "error");
    }
})();
