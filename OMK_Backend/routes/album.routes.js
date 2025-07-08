const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const upload = require('../middlewares/gridfsUpload');
const { albumValidation } = require('../middlewares/validation');

// Album CRUD routes
router.post('/', albumValidation.create, albumController.createAlbum);
router.get('/', albumController.getAlbums);
router.get('/:albumId', albumController.getAlbumById);
router.put('/:albumId', albumValidation.update, albumController.updateAlbum);
router.delete('/:albumId', albumController.deleteAlbum);

// File upload routes
router.post('/:albumId/upload', upload.single('file'), albumController.uploadFile);
router.delete('/:albumId/files/:filename', albumController.removeFile);

// Client specific routes
router.get('/client/:clientId', albumController.getClientAlbums);

module.exports = router;
