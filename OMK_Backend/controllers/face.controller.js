const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

exports.findMatchingFaces = async (req, res) => {
  try {
    const imagePath = req.file?.path;
    const folder = "uploaded_pictures"; // must be exact path sent in Postman

    if (!imagePath) {
      return res.status(400).json({ error: "No image file received" });
    }

    const form = new FormData();
    form.append("image", fs.createReadStream(imagePath)); // 🟢 field name: 'image'
    form.append("folder", folder); // 🟢 field name: 'folder'

    const response = await axios.post("http://localhost:5000/find", form, {
      headers: {
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity, // 📌 helps for large images
    });

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    // Return only URLs (optional: just top match with matches[0]?.url)
    const matches = response.data;
    const urls = matches.map((match) => match.url);

    return res.json(urls);
  } catch (error) {
    // 📛 More detailed error logging
    const errMessage = error.response?.data || error.message;
    console.error("❌ Face match error:", errMessage);
    return res.status(500).json({
      error: "Face matching failed",
      details: errMessage,
    });
  }
};
