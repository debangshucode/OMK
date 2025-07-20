const express = require("express");
const router = express.Router();
const {
  updateUserSettings,
  getUserSettings,
} = require("../controllers/user.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware.js");
router.patch(
  "/adminsettings",
  protect,
  authorizeRoles("admin"),
  upload.single("profileImage"),
  updateUserSettings
);

router.put(
  "/clientsettings",
  protect,
  authorizeRoles("user"),
  upload.single("profileImage"),
  updateUserSettings
);

router.get("/get-user", protect, authorizeRoles("user"), getUserSettings);
module.exports = router;
