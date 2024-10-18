const { Router } = require("express");

const addUser = require("./add-user");
const users = require("./users");
const home = require("./home");

module.exports = Router()
    .use("/add-user", addUser.router)
    .use("/users", users)
    .use("/", home);
