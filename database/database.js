const Sequelize = require("sequelize");

const sequelize = new Sequelize("ms-node", "root", process.env.PASSWORD, {
    dialect: "mysql",
    host: "localhost",
    logging: false,
});

module.exports = sequelize;
