const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.get('/:userId', auth, userCtrl.getUserInfos);

module.exports = router;
