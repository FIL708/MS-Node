const { Router } = require("express");
const feedRouter = require("./feed.routes");
const authRouter = require("./auth.routes");

module.exports = Router().use("/feed", feedRouter).use("/auth", authRouter);
