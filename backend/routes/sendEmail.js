const express = require('express');
const router = express.Router();
const sendEmailCtrl = require('../controllers/sendEmail');
const rateLimit = require('../middleware/rateLimit');

router.post('/', rateLimit.sendEmailLimiter, sendEmailCtrl.sendEmail);

module.exports = router;
