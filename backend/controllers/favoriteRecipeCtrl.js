const FavoriteRecipe = require('../models/FavoriteRecipeModel');

exports.addFavoriteRecipe = async (req, res) => {
  console.log('Add to favorite route called open');

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
      res
        .status(409)
        .json({ message: 'Recipe already exists in favorites for this user' });
      console.log('Error adding to favorites:', error);
    } else {
      res
        .status(500)
        .json({ message: 'Error adding recipe to favorites', error });
      console.log('Error adding to fav: ', error);
    }
  }
};

exports.checkIsFavoriteRecipe = async (req, res) => {
  console.log('CheckIsFavorite route called open');
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

exports.getUserFavoriteRecipe = async (req, res) => {
  console.log('Get user favorite recipe route called');
  const userId = req.user.userId;
  FavoriteRecipe.find({ userId: userId })
    .then((favoriteRecipes) => {
      res.status(200).json({ favoriteRecipes: favoriteRecipes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.removeUserFavoriteRecipe = async (req, res) => {
  console.log('Remove user favorite recipe route called');
  try {
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;
    const favoriteRecipe = await FavoriteRecipe.findOne({
      _id: recipeId,
      userId: userId,
    });
    console.log('user id : ', userId);
    console.log('recipe Id: ', recipeId);

    if (!favoriteRecipe) {
      console.log('Favorite recipe not found');
      return res.status(404).json({ message: 'Favorite recipe not found' });
    }
    await FavoriteRecipe.deleteOne({ _id: favoriteRecipe._id });
    res.status(200).json({ message: 'Favorite recipe successfully removed' });
  } catch (error) {
    console.log('Error when removing user favorite Recipe :', error);
    res
      .status(500)
      .json({ message: 'Error when removing user favorite recipe' });
  }
};
