import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './views/Navigation';
import ContactForm from './views/ContactForm';
import LoginForm from './views/LoginForm';
import SignUpForm from './views/SignupForm';
import Home from './pages/Home';
import Footer from './views/Footer';
import UserRecipes from './pages/UserRecipes';
import RecipeDetails from './views/RecipeDetails';

import './styles/_scss/main.scss';

function App() {
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <BrowserRouter>
      <Navigation
        isUserLogIn={isUserLogIn}
        setShowContactForm={setShowContactForm}
        setShowLoginForm={setShowLoginForm}
      />
      {showContactForm && (
        <ContactForm setShowContactForm={setShowContactForm} />
      )}
      {showLoginForm && (
        <LoginForm
          setShowLoginForm={setShowLoginForm}
          setShowSignUpForm={setShowSignUpForm}
        />
      )}
      {showSignUpForm && (
        <SignUpForm
          setShowSignUpForm={setShowSignUpForm}
          setShowLoginForm={setShowLoginForm}
        />
      )}

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
