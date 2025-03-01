const { Router } = require("express");
const { createPostValidator } = require("../validators/feed.validator");

const { getPosts, createPost } = require("../controllers/feed.controller");

const router = Router();

router.get("/posts", getPosts);
router.post("/posts",createPostValidator , createPost);

module.exports = router;
