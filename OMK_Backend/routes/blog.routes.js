const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
 } = require("../controllers/blog.controller");

 const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
 const upload = require("../middlewares/upload.middleware.js");

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);


// Admin-only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"), // 👈 this line handles file upload
  createBlog
);
router.put("/:id", protect, authorizeRoles("admin"), updateBlog);
router.delete("/:id", protect, authorizeRoles("admin"), deleteBlog);

module.exports = router;
