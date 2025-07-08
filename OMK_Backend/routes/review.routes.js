const express = require("express");
const {
  createReview,
  getAllReviews,
  getApprovedReviews,
  updateReviewApproval,
  deleteReview,
} = require("../controllers/review.controller.js");



const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();


// User creates a review
router.post("/", protect, createReview);

// Public route to show approved reviews
router.get("/public-review", getApprovedReviews);

// Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllReviews);
router.patch("/:id", protect, authorizeRoles("admin"), updateReviewApproval);
router.delete("/:id", protect, authorizeRoles("admin"), deleteReview);

module.exports = router;