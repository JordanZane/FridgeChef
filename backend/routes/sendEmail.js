const express = require('express');
const router = express.Router();
const sendEmailCtrl = require('../controllers/sendEmail');
const rateLimit = require('../middlewares/rateLimit');

router.post('/', rateLimit.sendEmailLimiter, sendEmailCtrl.sendEmail);
router.post(
  '/reset-pw',
  rateLimit.sendEmailLimiter,
  sendEmailCtrl.sendEmailResetPw
);

module.exports = router;
