import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './views/Navigation';
import Home from './pages/Home';
import UserRecipes from './pages/UserRecipes';

import './styles/_scss/main.scss';

function App() {
  const [isUserLogIn, setIsUserLogIn] = useState(false);

  return (
    <BrowserRouter>
      <Navigation isUserLogIn={isUserLogIn} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/my-recipes" element={<UserRecipes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
