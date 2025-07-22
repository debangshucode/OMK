const { getBucket } = require('../config/db.js');
const mongoose = require('mongoose');

class FileController {
  // Serve file from GridFS
  async getFile(req, res, next) {
    try {
      const bucket = getBucket();
      const { filename } = req.params;

      // First check if file exists
      const files = await bucket.find({ filename }).toArray();
      
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      const file = files[0];

      // Set appropriate headers
      res.set('Content-Type', file.contentType || 'application/octet-stream');
      res.set('Content-Length', file.length);
      res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

      // Create download stream
      const downloadStream = bucket.openDownloadStreamByName(filename);
      
      // Handle stream errors
      downloadStream.on('error', (error) => {
        console.error('Download stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: 'Error streaming file'
          });
        }
      });

      // Handle file not found in stream
      downloadStream.on('file', (doc) => {
        if (!doc) {
          return res.status(404).json({
            success: false,
            message: 'File not found'
          });
        }
      });

      // Pipe the file to response
      downloadStream.pipe(res);

    } catch (error) {
      console.error('Error in getFile:', error);
      next(error);
    }
  }

  // Get file by GridFS ObjectId
  async getFileById(req, res, next) {
    try {
      const bucket = getBucket();
      const { fileId } = req.params;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file ID'
        });
      }

      const objectId = new mongoose.Types.ObjectId(fileId);

      // Check if file exists
      const files = await bucket.find({ _id: objectId }).toArray();
      
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      const file = files[0];

      // Set appropriate headers
      res.set('Content-Type', file.contentType || 'application/octet-stream');
      res.set('Content-Length', file.length);
      res.set('Cache-Control', 'public, max-age=31536000');

      // Create download stream by ID
      const downloadStream = bucket.openDownloadStream(objectId);
      
      downloadStream.on('error', (error) => {
        console.error('Download stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: 'Error streaming file'
          });
        }
      });

      downloadStream.pipe(res);

    } catch (error) {
      console.error('Error in getFileById:', error);
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
          id: file._id,
          filename: file.filename,
          contentType: file.contentType,
          length: file.length,
          uploadDate: file.uploadDate,
          metadata: file.metadata
        }
      });
    } catch (error) {
      console.error('Error in getFileInfo:', error);
      next(error);
    }
  }

  // Download file with proper headers
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
      
      // Set download headers
      res.set('Content-Type', file.contentType || 'application/octet-stream');
      res.set('Content-Length', file.length);
      res.set('Content-Disposition', `attachment; filename="${file.metadata?.originalName || file.filename}"`);
      
      downloadStream.on('error', (error) => {
        console.error('Download stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: 'Error downloading file'
          });
        }
      });

      downloadStream.pipe(res);

    } catch (error) {
      console.error('Error in downloadFile:', error);
      next(error);
    }
  }

  // Get image thumbnail (if you want to add thumbnail functionality)
  async getImageThumbnail(req, res, next) {
    try {
      const bucket = getBucket();
      const { filename } = req.params;
      const { width = 300, height = 300, quality = 80 } = req.query;

      const files = await bucket.find({ filename }).toArray();
      
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      const file = files[0];

      // Check if it's an image
      if (!file.contentType || !file.contentType.startsWith('image/')) {
        return res.status(400).json({
          success: false,
          message: 'File is not an image'
        });
      }

      // For now, just return the original image
      // You can integrate with sharp or jimp for actual thumbnail generation
      const downloadStream = bucket.openDownloadStreamByName(filename);
      
      res.set('Content-Type', file.contentType);
      res.set('Cache-Control', 'public, max-age=31536000');
      
      downloadStream.on('error', (error) => {
        console.error('Download stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: 'Error streaming thumbnail'
          });
        }
      });

      downloadStream.pipe(res);

    } catch (error) {
      console.error('Error in getImageThumbnail:', error);
      next(error);
    }
  }

  // List all files with pagination
  async listFiles(req, res, next) {
    try {
      const bucket = getBucket();
      const { page = 1, limit = 20, albumId } = req.query;
      const skip = (page - 1) * limit;

      let filter = {};
      if (albumId) {
        filter['metadata.albumId'] = albumId;
      }

      const files = await bucket.find(filter)
        .sort({ uploadDate: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      const total = await bucket.find(filter).count();

      const fileList = files.map(file => ({
        id: file._id,
        filename: file.filename,
        contentType: file.contentType,
        length: file.length,
        uploadDate: file.uploadDate,
        metadata: file.metadata
      }));

      res.json({
        success: true,
        data: fileList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });

    } catch (error) {
      console.error('Error in listFiles:', error);
      next(error);
    }
  }
}

module.exports = new FileController();