const db = require("../utils/database");

const Cart = require("./cart.model");

class Product {
    constructor({ id, title, imageUrl, price, description }) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        return db.execute(
            "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
            [this.title, this.price, this.description, this.imageUrl]
        );
    }

    static getAll() {
        return db.execute("SELECT * FROM products");
    }

    static get(id) {
        return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
    }

    static delete(id) {}
}

module.exports = Product;
