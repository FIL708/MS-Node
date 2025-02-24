const getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: "first post", content: "Content of the first post" }],
    });
};

const createPost = (req, res, next) => {
    const { title, content } = req.body;

    if (!title && !content) {
        return res.status(400).json({
            message:
                "Missing required fields. Please ensure all mandatory fields are included in the request.",
        });
    }

    res.status(201).json({
        message: "Post created successfully.",
        data: { id: new Date().toISOString(), title, content },
    });
};

module.exports = { getPosts, createPost };
