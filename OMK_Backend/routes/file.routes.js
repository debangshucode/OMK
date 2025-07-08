const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// File serving routes
router.get('/:filename', fileController.getFile);
router.get('/:filename/info', fileController.getFileInfo);
router.get('/:filename/download', fileController.downloadFile);

module.exports = router;