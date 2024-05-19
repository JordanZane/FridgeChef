import React from 'react';
import likesIcon from '../assets/likes-icon.svg';

const RecipeCard = ({ recipes, handleRemoveIngredients }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  return (
    <>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <div className="recipes-infos">
            <div className="likes-container">
              <img src={likesIcon} alt="Likes" />
              {recipe.likes}
            </div>
            <h3 title={recipe.title}>{truncateText(recipe.title, 30)}</h3>
            <div className="img-container">
              <img title={recipe.title} src={recipe.image} alt={recipe.title} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default RecipeCard;
