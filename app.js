const path = require("path");

const express = require("express");

const routes = require("./routes");
const rootDir = require("./utils/path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
    next();
});

app.use(routes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, "views", "not-found.html"));
});

app.listen(3000);
