const FavoriteRecipe = require('../models/FavoriteRecipeModel');

exports.addFavoriteRecipe = async (req, res) => {
  try {
    const { title, image, recipeId } = req.body;

    const newFavoriteRecipe = new FavoriteRecipe({
      title,
      image,
      recipeId,
      userId: req.user.userId,
    });

    console.log('Favorite recipe added : ', newFavoriteRecipe);

    await newFavoriteRecipe.save();

    res.status(201).json({ message: 'Recipe added to favorites successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Recipe already exists in favorites' });
    } else {
      res
        .status(500)
        .json({ message: 'Error adding recipe to favorites', error });
      console.log('Error adding to fav: ', error);
    }
  }
};

exports.checkIsFavoriteRecipe = async (req, res) => {
  console.log('CheckIsFavorite backend open');
  try {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    const favoriteRecipe = await FavoriteRecipe.findOne({
      recipeId: recipeId,
      userId: userId,
    });

    if (favoriteRecipe) {
      res.status(200).json({ isFavorite: true });
    } else {
      res.status(404).json({ isFavorite: false });
    }
    console.log(favoriteRecipe);
    console.log(recipeId);
  } catch (error) {
    res.status(500).json({ message: 'Error checking favorite status', error });
    console.log('Error checking favorite status: ', error);
  }
};
