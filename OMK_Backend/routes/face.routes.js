const express = require("express");
const router = express.Router();
const faceController = require("../controllers/face.controller");
const multer = require("multer");
const path = require("path");

// File upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Your route
router.post("/find", upload.single("image"), faceController.findMatchingFaces);

module.exports = router;
