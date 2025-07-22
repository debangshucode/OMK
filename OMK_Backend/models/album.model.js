const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['wedding', 'birthday', 'portfolio', 'personal', 'corporate'],
    required: true,
  },
  parentAlbumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    default: null,
  },
  mediaFiles: [
  {
    filename: { type: String, required: true },
    filePath: { type: String, required: true }, // NEW
    originalName: String,
    fileType: { type: String, enum: ['image', 'video'], required: true },
    mimeType: String,
    fileSize: Number,
    uploadedAt: { type: Date, default: Date.now },
  },
],

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // assign later
  },
  coverImage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto update updatedAt
albumSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for performance
albumSchema.index({ category: 1 });
albumSchema.index({ createdAt: -1 });
albumSchema.index({ parentAlbumId: 1 });

module.exports = mongoose.model('Album', albumSchema);
