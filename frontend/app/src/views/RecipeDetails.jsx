import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import durationIcon from '../assets/duration-icon.svg';

const RecipeDetails = ({ isUserLogIn }) => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeSteps, setRecipeSteps] = useState([]);

  const ApiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchRecipeSteps = () => {
      fetch(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${ApiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching recipe steps');
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0 && data[0].steps) {
            setRecipeSteps(data[0].steps);
          }
        })
        .catch((error) => {
          console.error('Error fetching recipe steps:', error);
        });
    };

    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${ApiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching recipe details');
        }
        return response.json();
      })
      .then((data) => {
        setRecipeDetails(data);
        fetchRecipeSteps();
      })
      .catch((error) => {
        console.error('Error fetching recipe details:', error);
      });
  }, [id, ApiKey]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <main className="recipe-details-page">
      <div className="header-details">
        <div className="container">
          <div className="details-container">
            <div className="image-container">
              <img
                src={recipeDetails.image}
                alt={recipeDetails.title}
                title={recipeDetails.title}
              />
            </div>
            <div className="details-content">
              <h1>{recipeDetails.title}</h1>
              <div className="duration-container">
                <img src={durationIcon} alt="Duration" />
                <p>{recipeDetails.readyInMinutes}min</p>
              </div>
              <p>{parse(recipeDetails.summary)}</p>
              {isUserLogIn && (
                <div className="btn-container">
                  <button className="btn-style">Add to favorite</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex-container">
          <div className="infos-details">
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul>
                {recipeDetails.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name}
                    <div className="line"></div>
                    <span>
                      {ingredient.amount}
                      {ingredient.measures.metric.unitShort}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h2>Steps</h2>
              <ul>
                {recipeSteps.map((step, index) => (
                  <li key={index}>
                    <span>Step {index}</span> {step.step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="similar-recipes-container">
            <h2>Similar recipes</h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetails;
