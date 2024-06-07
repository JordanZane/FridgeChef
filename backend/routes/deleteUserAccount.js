const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.delete('/:userId', auth, userCtrl.deleteAccount);

module.exports = router;
