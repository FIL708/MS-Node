const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(
        (cp) => cp.productId.toString() === product._id.toString()
    );

    let newQuant = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuant = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuant;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuant,
        });
    }

    const updatedCart = {
        items: updatedCartItems,
    };

    this.cart = updatedCart;

    return this.save();
};

userSchema.methods.deleteFromCart = function (productId) {
    console.log("hit");

    const updatedCartItems = this.cart.items.filter(
        (item) => item.productId.toString() !== productId.toString()
    );

    this.cart.items = updatedCartItems;

    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };

    return this.save();
};

module.exports = model("User", userSchema);
