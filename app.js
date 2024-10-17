const path = require("path");

const express = require("express");

const routes = require("./routes");
const rootDir = require("./utils/path");
const { engine } = require("express-handlebars");

const app = express();

app.engine(
    "handlebars",
    engine({ layoutsDir: "views/layouts/", defaultLayout: "main" })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", (req, res, next) => {
    next();
});

app.use(routes);

app.use((req, res) => {
    res.status(404).render("404", { pageTitle: "Page Not Found." });
});

app.listen(3000);
