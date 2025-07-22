const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const albumId = req.params.albumId;
    const uploadDir = path.join(__dirname, '..', 'uploads', albumId);

    // Create the album directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File type filter (images and videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|bmp|svg|mp4|mov|avi|wmv|flv|webm|mkv|m4v|3gp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype && (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  );

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed!'), false);
  }
};

// Multer config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max 100MB
    files: 10,
  },
});

// Error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only images and videos')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
};

module.exports = {
  upload,
  handleMulterError,
};
