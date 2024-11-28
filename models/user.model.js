const mongodb = require("mongodb");

const getDb = require("../database/database").getDb;

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();

        return db.collection("users").insertOne(this);
    }

    addToCart(product) {
        const db = getDb();

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
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuant,
            });
        }

        const updatedCart = {
            items: updatedCartItems,
        };

        db.collection("users").updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: updatedCart } }
        );
    }

    deleteFromCart(productId) {
        const db = getDb();

        const updatedCartItems = this.cart.items.filter(
            (item) => item.productId.toString() !== productId.toString()
        );

        return db
            .collection("users")
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            );
    }

    getCart() {
        const db = getDb();
        const productsIds = this.cart.items.map((i) => i.productId);
        return db
            .collection("products")
            .find({ _id: { $in: productsIds } })
            .toArray()
            .then((products) => {
                return products.map((p) => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(
                            (i) => i.productId.toString() === p._id.toString()
                        ).quantity,
                    };
                });
            });
    }

    addOrder() {
        const db = getDb();
        return this.getCart()
            .then((products) => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        name: this.name,
                    },
                };
                return db.collection("orders").insertOne(order);
            })
            .then((_) => {
                this.cart = { items: [] };
                return db
                    .collection("users")
                    .updateOne(
                        { _id: new mongodb.ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    );
            });
    }

    getOrders() {
        const db = getDb();
        return db
            .collection("orders")
            .find({ "user._id": new mongodb.ObjectId(this._id) })
            .toArray();
    }

    static findById(id) {
        const db = getDb();

        return db
            .collection("users")
            .find({ _id: new mongodb.ObjectId(id) })
            .next()
            .then((result) => {
                return result;
            });
    }
}

module.exports = User;
