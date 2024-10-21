const fs = require("fs");
const path = require("path");

const products = [];

class Product {
    constructor(title) {
        this.title = title;
        this.dataLocation = path.join(
            path.dirname(require.main.filename),
            "data",
            "products.json"
        );
    }

    save() {
        const dataLocation = path.join(
            path.dirname(require.main.filename),
            "data",
            "products.json"
        );

        fs.readFile(dataLocation, (err, content) => {
            let products = [];
            if (!err) {
                products = JSON.parse(content);
            }
            products.push(this);
            fs.writeFile(dataLocation, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static getAll(cb) {
        const dataLocation = path.join(
            path.dirname(require.main.filename),
            "data",
            "products.json"
        );

        fs.readFile(dataLocation, (err, content) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(content));
        });
    }
}

module.exports = Product;
