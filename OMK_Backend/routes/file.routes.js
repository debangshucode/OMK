const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// File serving routes
router.get('/:filename', fileController.getFile);
router.get('/id/:fileId', fileController.getFileById); // Get file by GridFS ObjectId
router.get('/:filename/info', fileController.getFileInfo);
router.get('/:filename/download', fileController.downloadFile);
router.get('/:filename/thumbnail', fileController.getImageThumbnail);

// File listing route
router.get('/', fileController.listFiles);

module.exports = router;