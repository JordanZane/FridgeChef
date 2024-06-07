import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './views/Navigation';
import ContactForm from './views/forms/ContactForm';
import LoginForm from './views/forms/LoginForm';
import SignUpForm from './views/forms/SignupForm';
import Home from './pages/Home';
import Footer from './views/Footer';
import UserRecipes from './pages/UserRecipes';
import RecipeDetails from './views/RecipeDetails';
import LoginSuccess from './views/modals/LoginSuccess';
import LogoutSuccess from './views/modals/LogoutSuccess';
import AddToFavorite from './views/modals/AddToFavorite';
import UserAccount from './views/forms/UserAccount';

import './styles/_scss/main.scss';

function App() {
  const [isUserLogIn, setIsUserLogIn] = useState(() => {
    return localStorage.getItem('isLogged') === 'true';
  });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSuccessLoginModal, setShowSuccessLoginModal] = useState(false);
  const [showSuccessLogoutModal, setShowSuccessLogoutModal] = useState(false);
  const [showAddToFavoriteModal, setShowAddToFavoriteModal] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);

  return (
    <BrowserRouter>
      <Navigation
        isUserLogIn={isUserLogIn}
        setIsUserLogIn={setIsUserLogIn}
        setShowContactForm={setShowContactForm}
        setShowLoginForm={setShowLoginForm}
        setShowSuccessLogoutModal={setShowSuccessLogoutModal}
        setShowUserAccount={setShowUserAccount}
      />
      {showContactForm && (
        <ContactForm setShowContactForm={setShowContactForm} />
      )}
      {showLoginForm && (
        <LoginForm
          setShowLoginForm={setShowLoginForm}
          setShowSignUpForm={setShowSignUpForm}
          setIsUserLogIn={setIsUserLogIn}
          setShowSuccessLoginModal={setShowSuccessLoginModal}
        />
      )}
      {showSignUpForm && (
        <SignUpForm
          setShowSignUpForm={setShowSignUpForm}
          setShowLoginForm={setShowLoginForm}
        />
      )}

      {showSuccessLoginModal && (
        <LoginSuccess setShowSuccessLoginModal={setShowSuccessLoginModal} />
      )}

      {showSuccessLogoutModal && (
        <LogoutSuccess setShowSuccessLogoutModal={setShowSuccessLogoutModal} />
      )}

      {showAddToFavoriteModal && (
        <AddToFavorite setShowAddToFavoriteModal={setShowAddToFavoriteModal} />
      )}

      {showUserAccount && (
        <UserAccount
          setShowUserAccount={setShowUserAccount}
          setIsUserLogIn={setIsUserLogIn}
          setShowSuccessLogoutModal={setShowSuccessLogoutModal}
        />
      )}

      <Routes>
        <Route path="/" element={<Home isHomePage={true} />} />
        <Route
          path="/my-recipes"
          element={<UserRecipes isHomePage={false} />}
        />
        <Route
          path="/recipe-details/:id"
          element={
            <RecipeDetails
              isUserLogIn={isUserLogIn}
              setShowAddToFavoriteModal={setShowAddToFavoriteModal}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
