const Review = require("../models/review.model");

// User submits a review
exports.createReview = async (req, res) => {
  const { name, rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }

  try {
    const existingReview = await Review.findOne({ user: req.user.id });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already submitted a review" });
    }

    const review = await Review.create({
      user: req.user.id,
      name: req.user.name,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error submitting review", error: err.message });
  }
};

// Admin: Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: err.message });
  }
};

// Public: Get approved reviews
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: err.message });
  }
};

// Admin: Approve or hide review
exports.updateReviewApproval = async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    );
    res.json({ message: "Review status updated", updatedReview });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating review", error: err.message });
  }
};

// Admin: Delete a review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: err.message });
  }
};

//Client Review Given or not
// GET /api/reviews/check
exports.checkReviewStatus = async (req, res) => {
  try {
    const review = await Review.findOne({ user: req.user.id });
    res.json({ hasReview: !!review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
