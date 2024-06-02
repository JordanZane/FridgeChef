const express = require('express');
const router = express.Router();
const favoriteRecipeCtrl = require('../controllers/favoriteRecipeCtrl');

router.post('/', favoriteRecipeCtrl.addFavoriteRecipe);

module.exports = router;
