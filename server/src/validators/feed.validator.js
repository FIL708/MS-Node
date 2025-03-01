const { checkSchema } = require("express-validator");

const createPostValidator = checkSchema({
    title: {
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: "Title must be at least 5 characters long",
        },
        errorMessage: "Please enter a valid title.",
    },
    content: {
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: "Title must be at least 5 characters long",
        },
        errorMessage: "Please enter a valid content.",
    },
});

module.exports = { createPostValidator };
