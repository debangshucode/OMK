const Album = require('../models/album.model.js');
const User = require('../models/user.model.js');
const fs = require('fs');
const path = require('path');

class AlbumController {
  // Create a new album (no clientId required)
  async createAlbum(req, res, next) {
    try {
      const { title, description, category, parentAlbumId } = req.body;

      let parentAlbum = null;
      if (parentAlbumId) {
        parentAlbum = await Album.findById(parentAlbumId);
        if (!parentAlbum) return res.status(404).json({ success: false, message: 'Parent album not found' });
      }

      const albumPath = parentAlbum ? `${parentAlbum.path}/${title}` : `/${title}`;

      const album = new Album({
        title,
        description,
        category: category || 'personal',
        parentAlbumId: parentAlbumId || null,
        path: albumPath
      });

      await album.save();

      return res.status(201).json({ success: true, data: album , message: 'Album created successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Assign album to client
  async assignAlbumToClient(req, res, next) {
    try {
      const { albumId, clientId } = req.body;
      


      const album = await Album.findById(albumId);
      const client = await User.findById(clientId);
      if (!album || !client) return res.status(404).json({ success: false, message: 'Album or Client not found' });

      album.assignedTo= clientId;
      await album.save();

      return res.json({ success: true, message: `Album assigned to ${client.name}`, data: album });
    } catch (error) {
      next(error);
    }
  }

  // Upload files to local disk and save in album
  async uploadFiles(req, res, next) {
    try {
      const album = await Album.findById(req.params.albumId);
      if (!album) return res.status(404).json({ success: false, message: 'Album not found' });

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
      }

      const mediaFiles = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        fileType: file.mimetype.startsWith('video') ? 'video' : 'image',
        filePath: `/uploads/${album._id}/${file.filename}`, // Store relative path
        mimeType: file.mimetype,
        fileSize: file.size,
        uploadedAt: new Date()
      }));

      album.mediaFiles.push(...mediaFiles);
      await album.save();

      return res.status(201).json({
        success: true,
        message: `${mediaFiles.length} file(s) uploaded`,
        data: mediaFiles
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all albums (optionally filter by parentAlbumId)
  async getAlbums(req, res, next) {
    try {
      const { parentAlbumId } = req.query;
      const filter = parentAlbumId ? { parentAlbumId } : { parentAlbumId: null };

      const albums = await Album.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data: albums });
    } catch (error) {
      next(error);
    }
  }

  // Get single album with its children
async getAlbumById(req, res, next) {
  try {
    const album = await Album.findById(req.params.albumId)
      .populate('assignedTo', 'name email')
      .populate('parentAlbumId', 'title');

    if (!album) {
      return res.status(404).json({ success: false, message: 'Album not found' });
    }

    res.json({
      success: true,
      data: album,
    });
  } catch (error) {
    next(error);
  }
}

  // Update album
  async updateAlbum(req, res, next) {
    try {
      const updated = await Album.findByIdAndUpdate(req.params.albumId, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Album not found' });

      return res.json({ success: true, message: 'Updated successfully', data: updated });
    } catch (error) {
      next(error);
    }
  }

  // Delete album and its children
  async deleteAlbum(req, res, next) {
    try {
      await this._deleteRecursive(req.params.albumId);
      return res.json({ success: true, message: 'Album and all children deleted' });
    } catch (error) {
      next(error);
    }
  }

  async _deleteRecursive(albumId) {
    const album = await Album.findById(albumId);
    if (!album) return;

    const children = await Album.find({ parentAlbumId: albumId });
    for (const child of children) await this._deleteRecursive(child._id);

    const folderPath = path.join(__dirname, '..', 'uploads', albumId.toString());
    if (fs.existsSync(folderPath)) fs.rmSync(folderPath, { recursive: true, force: true });

    await Album.findByIdAndDelete(albumId);
  }
  
  // Remove file from album
  async removeFile(req, res, next) {
    try {
      const album = await Album.findById(req.params.albumId);
      if (!album) return res.status(404).json({ success: false, message: 'Album not found' });

      const fileIndex = album.mediaFiles.findIndex(f => f.filename === req.params.filename);
      if (fileIndex === -1) return res.status(404).json({ success: false, message: 'File not found' });

      const filePath = path.join(__dirname, '..', 'uploads', req.params.albumId, req.params.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      album.mediaFiles.splice(fileIndex, 1);
      await album.save();

      return res.json({ success: true, message: 'File deleted' });
    } catch (error) {
      next(error);
    }
  }

  // Download file
  async downloadFile(req, res, next) {
    try {
      const filePath = path.join(__dirname, '..', 'uploads', req.params.albumId, req.params.filename);
      if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, message: 'File not found' });

      return res.download(filePath);
    } catch (error) {
      next(error);
    }
  }

  // Breadcrumb
  async getBreadcrumbs(req, res, next) {
    try {
      const breadcrumbs = [];
      let current = await Album.findById(req.params.albumId);

      while (current) {
        breadcrumbs.unshift({ id: current._id, title: current.title });
        if (current.parentAlbumId) {
          current = await Album.findById(current.parentAlbumId);
        } else break;
      }

      return res.json({ success: true, data: breadcrumbs });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/albums/client/:clientId
  async getAlbumsByClient(req, res,next) {
    try {
      const clientId = req.params.clientId;

      const albums = await Album.find({ assignedTo: clientId })
        .sort({ createdAt: -1 })
        // .select('-mediaFiles') // optional: if you want to skip heavy mediaFiles
        .populate('assignedTo', 'name email');

      res.json(albums);
    } catch (err) {
      next(err);
    }
  }

}


module.exports = new AlbumController();
