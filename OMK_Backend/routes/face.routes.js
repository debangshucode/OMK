// routes/face.routes.js
const express = require("express");
const router = express.Router();
const faceController = require("../controllers/face.controller");
const multer = require("multer");
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/face/find
router.post("/find", upload.single("image"), faceController.findMatchingFaces);

module.exports = router;
