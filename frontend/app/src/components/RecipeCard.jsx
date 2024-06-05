import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import defaultImageRecipe from '../assets/default-image-recipe.jpg';
import likesIcon from '../assets/likes-icon.svg';

const RecipeCard = ({ recipes, isHomePage, getUserFavoriteRecipe }) => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleShowDetailsRecipe = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const removeFavoriteRecipe = async (recipeId) => {
    try {
      const token = Cookies.get('token');
      const userId = localStorage.getItem('userId');

      const response = await fetch(
        `${serverUrl}/remove-favorite-recipe/${userId}/${recipeId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
      } else {
        throw new Error('Failed to remove favorite recipe');
      }
    } catch (error) {
      console.error('Error removing favorite recipe:', error);
    }
    getUserFavoriteRecipe();
  };

  return (
    <>
      {recipes.map((recipe) => {
        return (
          <li className="recipe-card" key={recipe.id || recipe.recipeId}>
            <div className="recipes-infos">
              {isHomePage ? (
                <div className="likes-container">
                  <img src={likesIcon} alt="Likes" />
                  {recipe.likes}
                  {recipe.aggregateLikes}
                </div>
              ) : (
                <div className="likes-container ">
                  <button
                    className="remove-recipe-btn"
                    onClick={() => removeFavoriteRecipe(recipe._id)}
                  >
                    Remove
                  </button>
                </div>
              )}

              <h3
                onClick={() =>
                  handleShowDetailsRecipe(recipe.id || recipe.recipeId)
                }
                title={recipe.title}
              >
                {truncateText(recipe.title, 30)}
              </h3>
              <div className="img-container">
                <img
                  onClick={() =>
                    handleShowDetailsRecipe(recipe.id || recipe.recipeId)
                  }
                  title={recipe.title}
                  src={recipe.image || defaultImageRecipe}
                  alt={recipe.title}
                />
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default RecipeCard;
