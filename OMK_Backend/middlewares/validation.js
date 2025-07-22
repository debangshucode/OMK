const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Album validation rules
const albumValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot exceed 500 characters'),
    body('category')
      .isIn(['wedding', 'birthday', 'portfolio', 'personal', 'corporate'])
      .withMessage('Invalid category'),
    body('clientId')
      .isMongoId()
      .withMessage('Invalid client ID'),
    body('parentAlbumId')
      .optional()
      .isMongoId()
      .withMessage('Invalid parent album ID'),
    body('isFolder')
      .optional()
      .isBoolean()
      .withMessage('isFolder must be a boolean'),
    validate
  ],
  
  update: [
    param('albumId').isMongoId().withMessage('Invalid album ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot exceed 500 characters'),
    body('category')
      .optional()
      .isIn(['wedding', 'birthday', 'portfolio', 'personal', 'corporate'])
      .withMessage('Invalid category'),
    body('isPublic')
      .optional()
      .isBoolean()
      .withMessage('isPublic must be a boolean'),
    body('coverImage')
      .optional()
      .isString()
      .withMessage('coverImage must be a string'),
    validate
  ],

  getById: [
    param('albumId').isMongoId().withMessage('Invalid album ID'),
    validate
  ],

  delete: [
    param('albumId').isMongoId().withMessage('Invalid album ID'),
    validate
  ],

  uploadFiles: [
    param('albumId').isMongoId().withMessage('Invalid album ID'),
    validate
  ],

  removeFile: [
    param('albumId').isMongoId().withMessage('Invalid album ID'),
    param('filename').notEmpty().withMessage('Filename is required'),
    validate
  ],

  getClientAlbums: [
    param('clientId').isMongoId().withMessage('Invalid client ID'),
    validate
  ]
};

// File validation rules
const fileValidation = {
  getFile: [
    param('filename').notEmpty().withMessage('Filename is required'),
    validate
  ],

  getFileById: [
    param('fileId').isMongoId().withMessage('Invalid file ID'),
    validate
  ],

  getFileInfo: [
    param('filename').notEmpty().withMessage('Filename is required'),
    validate
  ],

  downloadFile: [
    param('filename').notEmpty().withMessage('Filename is required'),
    validate
  ]
};

module.exports = { 
  validate, 
  albumValidation, 
  fileValidation 
};