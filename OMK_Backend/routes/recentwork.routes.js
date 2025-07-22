const express = require("express");
const router = express.Router();

const {
  createRecentWork,
  getAllRecentWorks,
} = require("../controllers/recentwork.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware.js");

router.post(
  "/create-recent",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  createRecentWork
);

router.get("/", getAllRecentWorks);
module.exports = router;
