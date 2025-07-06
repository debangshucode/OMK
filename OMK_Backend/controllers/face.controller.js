// controllers/face.controller.js
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

// POST /api/face/find
exports.findMatchingFaces = async (req, res) => {
  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(req.file.path));

    const response = await axios.post("http://localhost:5000/find", form, {
      headers: form.getHeaders(),
    });

    // Delete temp uploaded file after use
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      matches: response.data,
    });
  } catch (error) {
    console.error("Face match error:", error);
    res.status(500).json({ success: false, message: "Face match failed" });
  }
};
