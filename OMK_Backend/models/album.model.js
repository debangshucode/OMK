const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['wedding', 'birthday', 'portfolio', 'personal', 'corporate'],
    required: true,
    index: true
  },
  mediaFiles: [
    {
      filename: {
        type: String,
        required: true
      },
      fileId: {
        type: String,
        required: true
      },
      originalName: String,
      fileType: {
        type: String,
        enum: ['image', 'video'],
        required: true
      },
      mimeType: String,
      fileSize: Number,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  isPublic: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
albumSchema.index({ clientId: 1, category: 1 });
albumSchema.index({ createdAt: -1 });

// Update the updatedAt field before saving
albumSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Album', albumSchema);