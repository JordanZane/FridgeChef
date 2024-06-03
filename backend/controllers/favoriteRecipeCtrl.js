const FavoriteRecipe = require('../models/FavoriteRecipeModel');

exports.addFavoriteRecipe = async (req, res) => {
  try {
    const { title, image } = req.body;

    const newFavoriteRecipe = new FavoriteRecipe({
      title,
      image,
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
