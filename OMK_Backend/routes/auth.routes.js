const express = require("express");
const { register, login, verifyOTP, logout, getUser, forgotPassword, resetPassword } = require("../controllers/auth.controller.js");
const { googleLogin } = require("../controllers/auth.controller.js");
const { protect } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login",login);
router.get("/logout", protect,logout)
router.get("/getuser",protect,getUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token", resetPassword);


router.post("/google-login", googleLogin);


module.exports = router;
