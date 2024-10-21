const fs = require("fs");
const path = require("path");

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    static dataLocation = path.join(
        path.dirname(require.main.filename),
        "data",
        "products.json"
    );

    save() {
        fs.readFile(Product.dataLocation, (err, content) => {
            let products = [];
            if (!err) {
                products = JSON.parse(content);
            }
            products.push(this);
            fs.writeFile(
                Product.dataLocation,
                JSON.stringify(products),
                (err) => {
                    console.error(err);
                }
            );
        });
    }

    static getAll(cb) {
        fs.readFile(Product.dataLocation, (err, content) => {
            if (err) {
                console.error(err);
                cb([]);
            }
            cb(JSON.parse(content));
        });
    }
}

module.exports = Product;
