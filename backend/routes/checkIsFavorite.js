const express = require('express');
const router = express.Router();
const checkIsFavoriteRecipe = require('../controllers/favoriteRecipeCtrl');
const auth = require('../middleware/auth');

router.post('/', auth, checkIsFavoriteRecipe.checkIsFavoriteRecipe);

module.exports = router;
