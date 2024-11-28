const mongodb = require("mongodb");
const log = require("../utils/logger");

const { MONGO_URL } = process.env;

let _db;

const MongoClient = mongodb.MongoClient;

const mongoConnect = async (cb) => {
    try {
        const client = await MongoClient.connect(MONGO_URL);
        _db = client.db();
        cb();
        log("MongoDB connection has been established successfully!", "success");
    } catch (error) {
        log(error, "error");
        throw error;
    }
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found.'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
