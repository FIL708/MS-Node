const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "ms-node",
    password: process.env.PASSWORD,
});

module.exports = pool.promise();
