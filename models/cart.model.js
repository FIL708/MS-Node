const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

class Cart {
    static addProduct({ id, productPrice }) {
        fs.readFile(p, (err, content) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(content);
            }

            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            if (existingProduct) {
                console.log(existingProduct);
                updatedProduct = {
                    ...existingProduct,
                    quantity: existingProduct.quantity + 1,
                };
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id, quantity: 1 };
                console.log(updatedProduct);
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => console.error(err));
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find((prod) => prod.id === id);

            if (!product) {
                return;
            }
            
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                (prod) => prod.id !== id
            );
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, content) => {
            const cart = JSON.parse(content);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}

module.exports = Cart;
