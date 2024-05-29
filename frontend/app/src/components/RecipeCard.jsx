import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImageRecipe from '../assets/default-image-recipe.jpg';
import likesIcon from '../assets/likes-icon.svg';

const RecipeCard = ({ recipes }) => {
  const navigate = useNavigate();

  const handleShowDetailsRecipe = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  return (
    <>
      {recipes.map((recipe) => (
        <li
          className="recipe-card"
          key={recipe.id}
          onClick={() => handleShowDetailsRecipe(recipe.id)}
        >
          <div className="recipes-infos">
            <div className="likes-container">
              <img src={likesIcon} alt="Likes" />
              {recipe.likes}
              {recipe.aggregateLikes}
            </div>
            <h3 title={recipe.title}>{truncateText(recipe.title, 30)}</h3>
            <div className="img-container">
              <img
                title={recipe.title}
                src={recipe.image || defaultImageRecipe}
                alt={recipe.title}
              />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default RecipeCard;
