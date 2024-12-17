const multer = require("multer");
const log = require("../utils/logger");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../images/");
    },
    filename: (req, file, cb) => {
        const { fieldname, mimetype } = file;
        const prefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const newName = `${prefix}-${fieldname}.${mimetype}`;
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

module.exports = (field) => {
    return (req, res, next) => {
        const uploadSingle = upload.single(field);

        uploadSingle(req, res, (error) => {
            if (error instanceof multer.MulterError || error) {
                log(error, "error");
                return res.redirect("/500");
            }

        });
        next();
    };
};
