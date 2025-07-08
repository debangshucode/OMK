const { getBucket } = require('../config/db.js');
const mongoose = require('mongoose');

class FileController {
  // Serve file from GridFS
  async getFile(req, res, next) {
    try {
      const bucket = getBucket();
      const { filename } = req.params;

      // Find file by filename
      const files = await bucket.find({ filename }).toArray();
      
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      const file = files[0];

      // Check if file is an image or video
      if (file.contentType && (file.contentType.startsWith('image') || file.contentType.startsWith('video'))) {
        const downloadStream = bucket.openDownloadStreamByName(filename);
        
        res.set('Content-Type', file.contentType);
        res.set('Content-Length', file.length);
        
        downloadStream.pipe(res);
        
        downloadStream.on('error', (error) => {
          console.error('Download stream error:', error);
          res.status(500).json({
            success: false,
            message: 'Error streaming file'
          });
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'File is not an image or video'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // Get file metadata
  async getFileInfo(req, res, next) {
    try {
      const bucket = getBucket();
      const { filename } = req.params;

      const files = await bucket.find({ filename }).toArray();
      
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      const file = files[0];

      res.json({
        success: true,
        data: {
          filename: file.filename,
          contentType: file.contentType,
          length: file.length,
          uploadDate: file.uploadDate,
          metadata: file.metadata
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Download file
  async downloadFile(req, res, next) {
    try {
      const bucket = getBucket();
      const { filename } = req.params;

      const files = await bucket.find({ filename }).toArray();
      
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      const file = files[0];
      const downloadStream = bucket.openDownloadStreamByName(filename);
      
      res.set('Content-Type', file.contentType);
      res.set('Content-Disposition', `attachment; filename="${file.metadata?.originalName || file.filename}"`);
      
      downloadStream.pipe(res);
      
      downloadStream.on('error', (error) => {
        console.error('Download stream error:', error);
        res.status(500).json({
          success: false,
          message: 'Error downloading file'
        });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FileController();