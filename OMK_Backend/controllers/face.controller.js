const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// exports.findMatchingFaces = async (req, res) => {
//   try {
//     const imagePath = req.file?.path;
//     const folder = "uploaded_pictures"; // must be exact path sent in Postman

//     if (!imagePath) {
//       return res.status(400).json({ error: "No image file received" });
//     }

//     const form = new FormData();
//     form.append("image", fs.createReadStream(imagePath)); // 🟢 field name: 'image'
//     form.append("folder", folder); // 🟢 field name: 'folder'

//     const response = await axios.post("http://localhost:5000/find", form, {
//       headers: {
//         ...form.getHeaders(),
//       },
//       maxBodyLength: Infinity, // 📌 helps for large images
//     });

//     // Clean up uploaded file
//     fs.unlinkSync(imagePath);

//     // Return only URLs (optional: just top match with matches[0]?.url)
//     const matches = response.data;
//     const urls = matches.map((match) => match.url);

//     return res.json(urls);
//   } catch (error) {
//     // 📛 More detailed error logging
//     const errMessage = error.response?.data || error.message;
//     console.error("❌ Face match error:", errMessage);
//     return res.status(500).json({
//       error: "Face matching failed",
//       details: errMessage,
//     });
//   }
// };

// const fs = require("fs");
// const FormData = require("form-data");
// const axios = require("axios");
// const path = require("path");

exports.findMatchingFaces = async (req, res) => {
  try {
    const image = req.file?.path;
    const albumId = req.body.albumId || req.query.albumId;

    if (!image || !albumId) {
      return res.status(400).json({ error: "Image and albumId are required." });
    }

    const form = new FormData();
    form.append("image", fs.createReadStream(image)); // must match Flask's `request.files["image"]`
    form.append("albumId", albumId); // must match Flask's `request.form["folder"]`

    // console.log("🔁 Sending to Flask:", { image, albumId });

    const response = await axios.post("http://localhost:5000/find", form, {
      headers: {
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity,
    });

    // Flask response example: { matchedMedia: [{ filePath: "media/album1/img1.jpg" }, ...] }
    const matches = response.data.matchedMedia || [];

    // Assuming your frontend needs full URLs for each image
    const baseUrl = "http://localhost:5000"; // change to your actual Flask domain
    const urls = matches.map((match) => `${match.filePath}`);

    // Cleanup uploaded image
    fs.unlinkSync(image);

    return res.json(urls);
  } catch (error) {
    const errMessage = error.response?.data || error.message;
    console.error("❌ Face match error:", errMessage);
    return res.status(500).json({
      error: "Face matching failed",
      details: errMessage,
    });
  }
};
