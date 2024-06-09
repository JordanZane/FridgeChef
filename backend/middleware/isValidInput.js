const { body, validationResult } = require('express-validator');

exports.validateInput = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('password').trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
