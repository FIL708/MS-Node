const { Router } = require("express");
const { getPosts, createPost } = require("../controllers/feed.controller");

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

module.exports = router;
