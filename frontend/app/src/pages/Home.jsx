import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = ({ isHomePage }) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);

  const ApiKey = process.env.REACT_APP_API_KEY;

  const handleInputChange = (e) => {
    const userText = e.target.value;
    setInputText(userText);
    fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?query=${userText}&number=5&apiKey=${ApiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching ingredient suggestions');
        }
        return response.json();
      })
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error('Error fetching ingredient suggestions:', error);
      });
  };

  const handleAddIngredients = (e) => {
    if (inputText && !ingredientsSearch.includes(inputText)) {
      setIngredientsSearch([...ingredientsSearch, inputText]);
      setInputText('');
    }
  };

  const handleRemoveIngredients = (index) => {
    const newIngredients = ingredientsSearch.filter((_, i) => i !== index);
    setIngredientsSearch(newIngredients);
  };

  const handleSuggestionsClick = (Suggestiontext) => {
    setInputText(Suggestiontext);
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchRecipes = () => {
      const ingredients = ingredientsSearch.join(',+');
      fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=48&apiKey=${ApiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching recipes');
          }
          return response.json();
        })
        .then((data) => {
          const sortedRecipes = data.sort((a, b) => b.likes - a.likes);
          setRecipes(sortedRecipes);
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
        });
    };

    const fetchRandomRecipes = () => {
      fetch(
        `https://api.spoonacular.com/recipes/random?number=48&apiKey=${ApiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching recipes');
          }
          return response.json();
        })
        .then((data) => {
          const sortedRandomRecipes = data.recipes.sort(
            (a, b) => b.aggregateLikes - a.aggregateLikes
          );
          setRandomRecipes(sortedRandomRecipes);
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
        });
    };

    if (ingredientsSearch.length === 0) {
      fetchRandomRecipes();
    } else {
      fetchRecipes();
    }
  }, [ingredientsSearch, ApiKey]);

  return (
    <main className="home">
      <div className="banner-container">
        <div className="container">
          <h1>FridgeChef</h1>
          <div className="search-aggredients-input-container">
            <div className="search-ingredients-input">
              <input
                type="text"
                id="ingredients"
                name="ingredients"
                placeholder="Add ingredients to find recipes (flour, beef, bread, eggs...)"
                value={inputText}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <button type="submit" onClick={handleAddIngredients}>
                Add
              </button>
              {suggestions.length > 0 && (
                <div className="suggestions-container">
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          className="suggestion"
                          onClick={(e) =>
                            handleSuggestionsClick(suggestion.name)
                          }
                        >
                          {suggestion.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="search-ingredients-container">
            <ul>
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
            </ul>
          </div>
        </div>
      </div>

      <div className="recipes-find-container">
        <div className="container">
          <h2>Recipes</h2>
          <div className="recipes-container">
            <ul>
              <RecipeCard isHomePage={isHomePage} recipes={recipes} />
            </ul>
          </div>
          <div className="recipes-container">
            <ul>
              <RecipeCard isHomePage={isHomePage} recipes={randomRecipes} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
