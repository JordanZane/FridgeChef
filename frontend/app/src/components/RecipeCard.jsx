import React from 'react';

const RecipeCard = ({ ingredientsSearch, handleRemoveIngredients }) => {
  return (
    <>
      {ingredientsSearch.map((ingredient, index) => (
        <li key={index}>
          {ingredient}
          <div className="remove-btn-container">
            <button
              onClick={() => handleRemoveIngredients(index)}
              className="remove-btn"
            >
              x
            </button>
          </div>
        </li>
      ))}
    </>
  );
};

export default RecipeCard;
