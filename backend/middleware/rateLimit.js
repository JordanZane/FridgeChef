const rateLimit = require('express-rate-limit');

const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});

const saveRecipeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

const sendEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message:
    'Too many contact form submissions from this IP, please try again after an hour',
});
