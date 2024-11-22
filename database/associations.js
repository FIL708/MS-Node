const CartItem = require("../models/cart-item.model");
const Cart = require("../models/cart.model");
const OrderItem = require("../models/order-item");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const initModelsAssociations = () => {
    Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
    User.hasMany(Product);
    User.hasOne(Cart);
    Cart.belongsTo(User);
    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });
    Order.belongsTo(User);
    User.hasMany(Order);
    Order.belongsToMany(Product, { through: OrderItem });
};

module.exports = initModelsAssociations;
