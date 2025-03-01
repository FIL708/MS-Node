const { validationResult } = require("express-validator");

const getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: 1,
                title: "first post",
                content: "Content of the first post",
                imageUrl: "images/duck.jpg",
                creator: {
                    name: "Filip",
                },
                createAt: new Date(),
            },
        ],
    });
};

const createPost = (req, res, next) => {
    const { title, content } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    if (!title && !content) {
        return res.status(400).json({
            message:
                "Missing required fields. Please ensure all mandatory fields are included in the request.",
        });
    }

    res.status(201).json({
        message: "Post created successfully.",
        post: {
            _id: new Date().toISOString(),
            title,
            content,
            creator: { name: "Filip" },
            createdAt: new Date(),
        },
    });
};

module.exports = { getPosts, createPost };
