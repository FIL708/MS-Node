const { Router } = require("express");
const {
    signupValidator,
    statusValidator,
} = require("../validators/auth.validator");
const {
    signUp,
    login,
    getUserStatus,
    updateUserStatus,
} = require("../controllers/auth.controller");
const isAuth = require("../middlewares/is-auth");

const router = Router();

router.put("/signup", signupValidator, signUp);

router.post("/login", login);

router.get("/status", isAuth, getUserStatus);

router.patch("/status", isAuth, statusValidator, updateUserStatus);

module.exports = router;
