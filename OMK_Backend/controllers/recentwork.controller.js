const RecentWork = require("../models/recentwork.model");

exports.createRecentWork = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const { type, title, category, link } = req.body;
    const image = req.file?.path;
    const newWork = new RecentWork({
      type,
      title,
      image,
      category,
      link,
    });
    const savedWork = await newWork.save();
    res.status(201).json({ "Saved Work": savedWork });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create recent work", details: err.message });
  }
};

//Get all recent work

exports.getAllRecentWorks = async (req, res) => {
  try {
    const works = await RecentWork.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(works);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch recent works", details: error.message });
  }
};
