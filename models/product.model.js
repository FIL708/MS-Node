const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static getAll(cb) {
        getProductsFromFile(cb);
    }

    static get(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((item) => item.id === id);
            cb(product);
        });
    }
}

module.exports = Product;
