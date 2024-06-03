const express = require('express');
const router = express.Router();
const favoriteRecipeCtrl = require('../controllers/favoriteRecipeCtrl');
const auth = require('../middleware/auth');

router.get('/', auth, favoriteRecipeCtrl.getFavorites);

module.exports = router;
