const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const favoriteRecipeModel = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
});

favoriteRecipeModel.plugin(uniqueValidator);

module.exports = mongoose.model('FavoriteRecipe', favoriteRecipeModel);
