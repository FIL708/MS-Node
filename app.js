const express = require("express");

const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(routes);

app.use((req, res) => {
    res.status(404).render("404", {
        pageTitle: "404 Error - Page Not Found",
        activePage: "",
    });
});

app.listen(3000);
