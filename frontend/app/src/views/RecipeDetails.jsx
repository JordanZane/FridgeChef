import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import durationIcon from '../assets/duration-icon.svg';

const RecipeDetails = () => {
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
      <header>
        <div className="container">
          <img
            src={recipeDetails.image}
            alt={recipeDetails.title}
            title={recipeDetails.title}
          />
          <div className="likes-container">{recipeDetails.likes}</div>
          <h1>{recipeDetails.title}</h1>
          <div className="duration-container">
            <img src={durationIcon} alt="Duration" />
            <p>{recipeDetails.readyInMinutes}min</p>
          </div>
        </div>
      </header>
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
    </main>
  );
};

export default RecipeDetails;
