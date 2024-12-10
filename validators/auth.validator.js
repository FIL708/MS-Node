const { checkSchema } = require("express-validator");
const User = require("../models/user.model");

const postSignupValidator = checkSchema({
    email: {
        normalizeEmail: true,
        isEmail: true,
        errorMessage: "Please enter a valid email.",
        custom: {
            options: async (value) => {
                const isUserExisted = await User.findOne({ email: value });

                if (isUserExisted) {
                    throw new Error("User already exists.");
                }
                return true;
            },
        },
    },
    password: {
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: "Password must be at least 5 characters long",
        },
        errorMessage: "Please enter a valid password.",
    },
    confirmPassword: {
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: "Password must be at least 5 characters long",
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match.");
                }
                return true;
            },
        },
    },
});

const postLoginValidator = checkSchema({
    email: {
        normalizeEmail: true,
        isEmail: true,
    },
    password: { trim: true },
});

module.exports = { postSignupValidator, postLoginValidator };
