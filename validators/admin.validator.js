const { checkSchema } = require("express-validator");

const postProductValidator = checkSchema({
    title: {
        isString: true,
        isLength: { options: { min: 3 } },
        trim: true,
    },
    price: { isFloat: true },
    description: { isLength: { options: { min: 5, max: 500 }, trim: true } },
});

module.exports = { postProductValidator };
