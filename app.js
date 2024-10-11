const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
    console.log("s");
    next();
});

app.listen(3000);
