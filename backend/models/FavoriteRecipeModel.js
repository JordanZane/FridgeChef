const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const favoriteRecipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true },
  recipeId: { type: String, required: true },
});

favoriteRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
favoriteRecipeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('FavoriteRecipe', favoriteRecipeSchema);
