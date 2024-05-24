import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './views/Navigation';
import ContactForm from './views/ContactForm';
import LoginForm from './views/LoginForm';
import Home from './pages/Home';
import Footer from './views/Footer';
import UserRecipes from './pages/UserRecipes';
import RecipeDetails from './views/RecipeDetails';

import './styles/_scss/main.scss';

function App() {
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  const [showLogInForm, setShowLogInForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <BrowserRouter>
      <Navigation
        isUserLogIn={isUserLogIn}
        setShowContactForm={setShowContactForm}
        setShowLogInForm={setShowLogInForm}
      />
      {showContactForm && (
        <ContactForm setShowContactForm={setShowContactForm} />
      )}
      {showLogInForm && <LoginForm setShowLogInForm={setShowLogInForm} />}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/my-recipes" element={<UserRecipes />}></Route>
        <Route
          path="/recipe-details/:id"
          element={<RecipeDetails isUserLogIn={isUserLogIn} />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
