const { Router } = require("express");
const { createPostValidator } = require("../validators/feed.validator");

const {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
} = require("../controllers/feed.controller");
const isAuth = require("../middlewares/is-auth");

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:postId", getPost);
router.post("/posts", isAuth, createPostValidator, createPost);
router.put("/posts/:postId", isAuth, createPostValidator, updatePost);
router.delete("/posts/:postId", isAuth, deletePost);

module.exports = router;
