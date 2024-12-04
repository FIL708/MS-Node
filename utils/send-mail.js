const nodemailer = require("nodemailer");
const log = require("./logger");

const { MAIL_USER, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
});

const sendMail = async ({
    email,
    subject = "NODE_MS Shop",
    html = "<h1>Email</h1>",
}) => {
    try {
        const mail = await transporter.sendMail({
            from: "",
            to: email,
            subject,
            html,
        });

        return mail;
    } catch (error) {
        log(error, "error");
    }
};

module.exports = sendMail;
