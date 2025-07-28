const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const albumController = require('../controllers/albumController');
const { upload, handleMulterError } = require('../middlewares/upload.album'); // updated to use multer.diskStorage
const { albumValidation } = require('../middlewares/validation'); // Optional, if still using validation middleware

// Assign album to a specific client
router.post('/assign', albumController.assignAlbumToClient);      // Assign album to a user

// Album CRUD
router.post('/', albumController.createAlbum);                    // Create album (no client required)
router.get('/', albumController.getAlbums);                       // Get all root/child albums
router.get('/:albumId', albumController.getAlbumById);            // Get single album with children
router.put('/:albumId', albumController.updateAlbum);             // Update album
router.delete('/:albumId', albumController.deleteAlbum.bind(albumController));


// File Upload
router.post(
  '/:albumId/upload',
  upload.array('files', 10),
  handleMulterError,
  albumController.uploadFiles
);

// File download and delete
router.delete('/:albumId/files/:filename', albumController.removeFile);  // Remove file
// router.get('/:albumId/files/:filename', albumController.downloadFile);   // Download file

// Breadcrumb (album path)
router.get('/:albumId/path', albumController.getBreadcrumbs);

// New Route to Download File
router.get('/:albumId/download/:filename', async (req, res) => {
  const { albumId, filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', albumId, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).json({ success: false, message: 'Download failed' });
    }
  });
});

router.get('/client/:clientId', albumController.getAlbumsByClient);


module.exports = router;
