const { Router } = require("express");
const feedRouter = require("./feed.routes");

module.exports = Router().use("/feed", feedRouter);
