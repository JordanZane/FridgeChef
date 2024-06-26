import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import parse from 'html-react-parser';

import durationIcon from '../assets/duration-icon.svg';
import Loader from '../components/Loader';

const RecipeDetails = ({ isUserLogIn, setShowAddToFavoriteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [showFavoriteBtn, setShowFavoriteBtn] = useState(true);
  const [loading, setLoading] = useState(true);

  const ApiKey = process.env.REACT_APP_API_KEY;
  const serverUrl = process.env.REACT_APP_SERVER_URL;

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

    const fetchRecipeDetails = () => {
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
          console.log('Recipe details:', data);
          fetchRecipeSteps();
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recipe details:', error);
          setLoading(false);
        });
    };

    const fetchSimilarRecipes = () => {
      fetch(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${ApiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching similar recipes');
          }
          return response.json();
        })
        .then((data) => {
          setSimilarRecipes(data);
        })
        .catch((error) => {
          console.error('Error fetching similar recipes:', error);
        });
    };

    fetchRecipeDetails();
    fetchSimilarRecipes();
  }, [id, ApiKey]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (recipeDetails && recipeDetails.id) {
        console.log('Check if is a favorite recipe');
        const token = Cookies.get('token');
        const response = await fetch(`${serverUrl}/check-favorite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ recipeId: recipeDetails.id }),
        });

        const data = await response.json();
        console.log('recipe id : ', recipeDetails.id);
        console.log('response ', data);

        if (data.isFavorite === false) {
          setShowFavoriteBtn(true);
        } else {
          setShowFavoriteBtn(false);
        }
        console.log('DataIsFavorite: ', data.isFavorite);
        console.log('showFavoriteBtn : ', showFavoriteBtn);
      }
    };
    checkFavoriteStatus();
  }, [recipeDetails, serverUrl, showFavoriteBtn]);

  const handleShowDetailsRecipe = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  const handleAddToFavorites = () => {
    const userId = localStorage.getItem('userId');
    const token = Cookies.get('token');

    console.log('token :', token);
    console.log('userId :', userId);

    const favoriteRecipeData = {
      title: recipeDetails.title,
      image: recipeDetails.image,
      recipeId: recipeDetails.id,
      userId: userId,
    };
    console.log('add to favorite the recipe : ', favoriteRecipeData);
    fetch(`${serverUrl}/add-to-favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(favoriteRecipeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error adding recipe to favorites');
        } else {
          setShowAddToFavoriteModal(true);
          setShowFavoriteBtn(false);
        }
      })
      .catch((error) => {
        console.error('Error adding recipe to favorites:', error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <main className="recipe-details-page">
      {loading ? (
        <Loader />
      ) : (
        <>
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
                  <p>{parse(recipeDetails.summary)}</p>
                  <div className="flex-container">
                    {isUserLogIn && (
                      <div className="btn-container">
                        {showFavoriteBtn ? (
                          <button
                            onClick={handleAddToFavorites}
                            className="btn-style"
                          >
                            Add to favorite
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    )}
                    <div className="duration-container">
                      <img src={durationIcon} alt="Duration" />
                      <p>{recipeDetails.readyInMinutes}min</p>
                    </div>
                  </div>
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
                    {recipeDetails.extendedIngredients.map(
                      (ingredient, index) => (
                        <li key={index}>
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            alt={ingredient.name}
                          />
                          <span> {ingredient.name}</span>
                          <div className="line"></div>
                          <span>
                            {ingredient.amount}
                            {ingredient.measures.metric.unitShort}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="recipe-instructions">
                  <h2>Steps</h2>
                  <ul>
                    {recipeSteps.map((step, index) => (
                      <li key={index}>
                        <span>Step {index + 1}</span> {step.step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="similar-recipes-container">
                <h2>Similar recipes</h2>
                <ul>
                  {similarRecipes.map((similarRecipe, index) => (
                    <li
                      className="recipe-card"
                      key={index}
                      onClick={() => handleShowDetailsRecipe(similarRecipe.id)}
                    >
                      <div className="recipes-infos">
                        <h3 title={similarRecipe.title}>
                          {truncateText(similarRecipe.title, 50)}
                        </h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default RecipeDetails;
