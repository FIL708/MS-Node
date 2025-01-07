const multer = require("multer");
const log = require("../utils/logger");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/");
    },
    filename: (req, file, cb) => {
        const { mimetype } = file;
        const ext = mimetype.split("/")[1];
        const uuid = crypto.randomUUID();
        const newName = `${uuid}.${ext}`;

        cb(null, newName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedImageExt = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedImageExt.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadImageMiddleware = (field) => {
    return (req, res, next) => {
        console.log("body", req.body);

        const uploadSingle = upload.single(field);

        uploadSingle(req, res, (error) => {
            if (error instanceof multer.MulterError || error) {
                log(error, "error");
                return res.redirect("/500");
            }
            next();
        });
    };
};

module.exports = uploadImageMiddleware;
