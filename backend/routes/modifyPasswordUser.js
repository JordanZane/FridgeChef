const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/:userId', auth, userCtrl.modifyPassword);

module.exports = router;
