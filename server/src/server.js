const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "images");

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const fileExt = file.mimetype.split("/")[1];
        const fileName = `${uuidv4()}.${fileExt}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(multer({ storage, fileFilter: fileFilter }).single("image"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use(cors({ origin: "http://localhost:3000" }));

app.use(routes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(process.env.MONGO_URL)
    .then((_) => {
        app.listen(8080, () => {
            console.log("Server listen on 8080");
        });
    })
    .catch((err) => console.log(err));
