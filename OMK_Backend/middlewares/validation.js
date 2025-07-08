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
    validate
  ]
};

module.exports = { validate, albumValidation };