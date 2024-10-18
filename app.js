const path = require("path");
const express = require("express");
const routes = require("./routes");
const rootDir = require("./utils/path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/", (req, res, next) => {
    next();
});

app.use(routes);

app.use((req, res) => {
    res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3000);
