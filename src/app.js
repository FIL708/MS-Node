const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
    const { url } = req;
    console.log("Someone hit Home page: ", url);
    res.send("<h1>Home page</h1>");
});

app.get("/users", (req, res) => {
    const { url } = req;
    console.log("Someone hit Users page: ", url);
    res.send("<h1>Users page</h1>");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
