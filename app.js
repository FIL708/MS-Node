const express = require("express");

const routes = require("./routes");
const { getNotFound } = require("./controllers/error.controller");

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

app.use(getNotFound);

app.listen(3000);
