const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/:userId', userCtrl.resetPassword);

module.exports = router;
