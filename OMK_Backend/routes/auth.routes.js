const express = require("express");
const { register, login, verifyOTP, logout, getUser, forgotPassword, resetPassword, getAllUsers } = require("../controllers/auth.controller.js");
const { googleLogin } = require("../controllers/auth.controller.js");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login",login);
router.get("/logout", protect,logout)
router.get("/getuser",protect,getUser);
router.get("/all-user", protect,authorizeRoles("admin"), getAllUsers);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token", resetPassword);
// GET /api/auth/verify-session
router.get("/verify-session", protect, (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    }
  });
});



router.post("/google-login", googleLogin);


module.exports = router;
