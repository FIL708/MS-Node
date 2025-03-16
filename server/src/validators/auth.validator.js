const { checkSchema } = require("express-validator");
const User = require("../models/user");

const signupValidator = checkSchema({
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
    name: {
        trim: true,
        notEmpty: true,
        errorMessage: "Please enter a valid content.",
    },
});

const statusValidator = checkSchema({
    status: {
        trim: true,
        // notEmpty: true,
    },
});

module.exports = { signupValidator, statusValidator };
