const { checkSchema } = require("express-validator");

const postProductValidator = checkSchema({
    title: {
        trim: true,
        isAlphanumeric: true,
        isLength: { options: { min: 3 } },
    },
    price: { isFloat: true },
    description: { trim: true, isLength: { options: { min: 5, max: 500 } } },
});

module.exports = { postProductValidator };
