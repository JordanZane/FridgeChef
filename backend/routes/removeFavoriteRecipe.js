const express = require('express');
const router = express.Router();
const favoriteRecipeCtrl = require('../controllers/favoriteRecipeCtrl');
const auth = require('../middleware/auth');

router.delete(
  '/:userId/:recipeId',
  auth,
  favoriteRecipeCtrl.removeUserFavoriteRecipe
);

module.exports = router;
