const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/', userCtrl.logout);

module.exports = router;
