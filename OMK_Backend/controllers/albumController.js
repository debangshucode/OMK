const Album = require('../models/album.model.js');
const User = require('../models/user.model.js');
const { getBucket } = require('../config/db.js');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const { Readable } = require('stream');

class AlbumController {
  // Create a new album
  async createAlbum(req, res, next) {
    try {
      const { title, description, category, clientId } = req.body;

      // Verify client exists
      const client = await User.findById(clientId);
      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client not found'
        });
      }

      const album = new Album({
        title,
        description,
        category,
        clientId
      });

      await album.save();

      res.status(201).json({
        success: true,
        message: 'Album created successfully',
        data: album
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all albums with optional filters
  async getAlbums(req, res, next) {
    try {
      const { clientId, category, page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const filter = {};
      if (clientId) filter.clientId = clientId;
      if (category) filter.category = category;

      const albums = await Album.find(filter)
        .populate('clientId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Album.countDocuments(filter);

      res.json({
        success: true,
        data: albums,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get album by ID
  async getAlbumById(req, res, next) {
    try {
      const album = await Album.findById(req.params.albumId)
        .populate('clientId', 'name email phone');

      if (!album) {
        return res.status(404).json({
          success: false,
          message: 'Album not found'
        });
      }

      res.json({
        success: true,
        data: album
      });
    } catch (error) {
      next(error);
    }
  }

  // Update album
  async updateAlbum(req, res, next) {
    try {
      const { title, description, category, isPublic, coverImage } = req.body;
      
      const album = await Album.findByIdAndUpdate(
        req.params.albumId,
        { title, description, category, isPublic, coverImage },
        { new: true, runValidators: true }
      );

      if (!album) {
        return res.status(404).json({
          success: false,
          message: 'Album not found'
        });
      }

      res.json({
        success: true,
        message: 'Album updated successfully',
        data: album
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete album
  async deleteAlbum(req, res, next) {
    try {
      const album = await Album.findById(req.params.albumId);

      if (!album) {
        return res.status(404).json({
          success: false,
          message: 'Album not found'
        });
      }

      // Delete all associated files from GridFS
      const bucket = getBucket();
      for (const mediaFile of album.mediaFiles) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(mediaFile.fileId));
        } catch (deleteError) {
          console.log(`Error deleting file ${mediaFile.filename}:`, deleteError.message);
        }
      }

      await Album.findByIdAndDelete(req.params.albumId);

      res.json({
        success: true,
        message: 'Album and associated files deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Upload file to album (FIXED VERSION)
  async uploadFile(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const album = await Album.findById(req.params.albumId);
      if (!album) {
        return res.status(404).json({
          success: false,
          message: 'Album not found'
        });
      }

      const bucket = getBucket();
      
      // Generate unique filename
      const filename = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname);
      
      // Create upload stream
      const uploadStream = bucket.openUploadStream(filename, {
        metadata: {
          originalName: req.file.originalname,
          uploadedBy: req.user?.id || null,
          albumId: req.params.albumId,
          uploadedAt: new Date()
        }
      });

      // Handle upload completion
      uploadStream.on('finish', async () => {
        try {
          const mediaFile = {
            filename: filename,
            fileId: uploadStream.id.toString(),
            originalName: req.file.originalname,
            fileType: req.file.mimetype.startsWith('video') ? 'video' : 'image',
            mimeType: req.file.mimetype,
            fileSize: req.file.size
          };

          album.mediaFiles.push(mediaFile);
          await album.save();

          res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: {
              file: mediaFile,
              album: album._id
            }
          });
        } catch (saveError) {
          console.error('Error saving file info to album:', saveError);
          res.status(500).json({
            success: false,
            message: 'File uploaded but failed to save to album'
          });
        }
      });

      // Handle upload errors
      uploadStream.on('error', (error) => {
        console.error('GridFS upload error:', error);
        res.status(500).json({
          success: false,
          message: 'File upload failed'
        });
      });

      // Create readable stream from buffer and pipe to GridFS
      const readableStream = new Readable();
      readableStream.push(req.file.buffer);
      readableStream.push(null);
      
      readableStream.pipe(uploadStream);

    } catch (error) {
      next(error);
    }
  }

  // Remove file from album (UPDATED)
  async removeFile(req, res, next) {
    try {
      const { albumId, filename } = req.params;

      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).json({
          success: false,
          message: 'Album not found'
        });
      }

      const fileIndex = album.mediaFiles.findIndex(
        file => file.filename === filename
      );

      if (fileIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'File not found in album'
        });
      }

      const fileToRemove = album.mediaFiles[fileIndex];

      // Remove from GridFS
      const bucket = getBucket();
      try {
        await bucket.delete(new mongoose.Types.ObjectId(fileToRemove.fileId));
      } catch (deleteError) {
        console.log(`Warning: Could not delete file from GridFS: ${deleteError.message}`);
      }

      // Remove from album
      album.mediaFiles.splice(fileIndex, 1);
      await album.save();

      res.json({
        success: true,
        message: 'File removed successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get client's albums
  async getClientAlbums(req, res, next) {
    try {
      const { clientId } = req.params;
      const { category } = req.query;

      const filter = { clientId };
      if (category) filter.category = category;

      const albums = await Album.find(filter)
        .sort({ createdAt: -1 })
        .select('title category mediaFiles createdAt coverImage');

      res.json({
        success: true,
        data: albums
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AlbumController();