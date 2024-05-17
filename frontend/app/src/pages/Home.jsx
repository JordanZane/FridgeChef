import React, { useState, useEffect } from 'react';
import likesIcon from '../assets/likes-icon.svg';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ingredientsSearch, setIngredientsSearch] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const maxTitleLength = 30;

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
        setRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    fetchRecipes();
  }, [ingredientsSearch]);

  return (
    <main className="home">
      <div className="banner-container">
        <div className="container">
          <h1>FridgeChef</h1>
          <div className="search-ingredients-input">
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              placeholder="Add ingredients to find recipes (flour, beef, bread, eggs...)"
              value={inputText}
              onChange={handleInputChange}
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
                        onClick={(e) => handleSuggestionsClick(suggestion.name)}
                      >
                        {suggestion.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <div className="recipes-infos">
                    <div className="likes-container">
                      <img src={likesIcon} alt="Likes" />
                      {recipe.likes}
                    </div>
                    <h3 title={recipe.title}>
                      {truncateText(recipe.title, maxTitleLength)}
                    </h3>
                    <div className="img-container">
                      <img
                        title={recipe.title}
                        src={recipe.image}
                        alt={recipe.title}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
