const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["photo", "video"],
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
); // adds createdAt and updatedAt fields

module.exports = mongoose.model("RecentWork", recentSchema);
