const multer = require('multer');
const { Readable } = require('stream');
const crypto = require('crypto');
const path = require('path');

// Memory storage for processing before GridFS upload
const storage = multer.memoryStorage();

// File filter for images and videos only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|wmv|flv|webm/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed!'), false);
  }
};

// Configure multer with memory storage
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

module.exports = upload;