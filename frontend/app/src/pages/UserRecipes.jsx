import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import Cookies from 'js-cookie';

const UserRecipes = ({ isHomePage }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const getUserFavoriteRecipe = async () => {
    console.log('Get user favorite recipes : ', favoriteRecipes);
    const token = Cookies.get('token');
    const userId = localStorage.getItem('userId');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    fetch(`${serverUrl}/get-user-favorite-recipes/${userId}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            'Error : Error when trying to get user favorite recipes'
          );
        }
      })
      .then((data) => {
        console.log('data :', data);
        const userFavoriteRecipes = data.favoriteRecipes;
        setFavoriteRecipes(userFavoriteRecipes);
      })
      .catch((error) => {
        console.log('error : ', error);
      });
  };

  useEffect(() => {
    getUserFavoriteRecipe();
  }, []);

  return (
    <main className="favorite-recipes-page">
      <div className="banner-container">
        <div className="container">
          <h1>My recipes</h1>
        </div>
      </div>
      <div className="favorite-recipes-container">
        <div className="container">
          <h2>My favorites recipes</h2>
          <ul>
            <RecipeCard recipes={favoriteRecipes} isHomePage={isHomePage} />
          </ul>
        </div>
      </div>
    </main>
  );
};

export default UserRecipes;
