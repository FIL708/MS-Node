const { validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

const io = require("../socket");

const { clearImage } = require("../utils");

const getPosts = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 5;
        const totalItems = await Post.countDocuments();

        const posts = await Post.find()
            .populate("creator")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        if (!posts) {
            const error = new Error("Posts not found!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: "Posts found.", posts, totalItems });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

const getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error("Post not found!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: "Post found", post });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

const createPost = async (req, res, next) => {
    const { title, content } = req.body;

    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error(
                "Validation failed, entered data is incorrect!"
            );
            error.statusCode = 422;
            throw error;
        }

        if (!req.file) {
            const error = new Error("No image provided!");
            error.statusCode = 422;
            throw error;
        }

        const imageUrl = "images/" + req.file.filename;

        const post = new Post({
            title,
            content,
            imageUrl,
            creator: req.userId,
        });
        const result = await post.save();

        const user = await User.findById(req.userId);
        user.posts.push(post);
        await user.save();

        io.getIo().emit("posts", {
            action: "create",
            post: {
                ...post._doc,
                creator: { _id: req.userId, name: user.name },
            },
        });

        res.status(201).json({
            message: "Post created successfully.",
            post: result,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error(
                "Validation failed, entered data is incorrect."
            );
            error.statusCode = 422;
            throw error;
        }

        const { postId } = req.params;
        const { title, content } = req.body;
        let imageUrl = req.body.image;

        if (req.file) {
            imageUrl = "images/" + req.file.filename;
        }

        if (!imageUrl) {
            const error = new Error("No file picked.");
            error.statusCode = 422;
            throw error;
        }

        const post = await Post.findById(postId).populate("creator");

        if (!post) {
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            throw error;
        }
console.log(post);

        if (post.creator.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }

        if (imageUrl !== post.imageUrl) {
            clearImage(post.imageUrl);
        }

        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;

        await post.save();

        io.getIo().emit("post", { action: "update", post });

        res.status(200).json({ message: "Post updated!", post });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);

        if (!post) {
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            throw error;
        }

        if (post.creator.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }

        clearImage(post.imageUrl);

        await Post.findByIdAndDelete(postId);

        const user = await User.findById(req.userId);

        await user.posts.pull(postId);

        await user.save();

        io.getIo().emit("posts", { action: "delete", post: postId });

        res.status(200).json({ message: "Deleted post." });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
