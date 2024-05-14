import React from 'react';
import BannerHome from '../assets/banner-home.jpg';

const Home = () => {
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
            />
            <button type="submit">Add</button>
          </div>
        </div>
      </div>
      <div className="recipes-find-container">
        <div className="container">
          <h2>Recipes</h2>
        </div>
      </div>
    </main>
  );
};

export default Home;
