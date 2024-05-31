const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const isValidateInput = require('../middleware/isValidInput');

router.post('/', isValidateInput.validateInput, userCtrl.signup);

module.exports = router;
