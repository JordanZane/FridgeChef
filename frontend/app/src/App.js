import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './views/Navigation';
import ContactForm from './views/forms/ContactForm';
import LoginForm from './views/forms/LoginForm';
import SignUpForm from './views/forms/SignupForm';
import Home from './pages/Home';
import UserRecipes from './pages/UserRecipes';
import ResetPw from './pages/ResetPw';
import Footer from './views/Footer';
import RecipeDetails from './views/RecipeDetails';
import LoginSuccess from './views/modals/LoginSuccess';
import LogoutSuccess from './views/modals/LogoutSuccess';
import AddToFavorite from './views/modals/AddToFavorite';
import ModifyPwSuccess from './views/modals/ModifyPwSuccess';
import UserAccount from './views/forms/UserAccount';
import DeleteAccount from './views/modals/DeleteAccount';
import ResetPwForm from './views/forms/ResetPwForm';

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
  const [showModifyPwSuccessModal, setShowModifyPwSuccessModal] =
    useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

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
          setShowResetPasswordForm={setShowResetPasswordForm}
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

      {showModifyPwSuccessModal && (
        <ModifyPwSuccess
          setShowModifyPwSuccessModal={setShowModifyPwSuccessModal}
        />
      )}

      {showAddToFavoriteModal && (
        <AddToFavorite setShowAddToFavoriteModal={setShowAddToFavoriteModal} />
      )}

      {showUserAccount && (
        <UserAccount
          setShowUserAccount={setShowUserAccount}
          setIsUserLogIn={setIsUserLogIn}
          setShowSuccessLogoutModal={setShowSuccessLogoutModal}
          setShowModifyPwSuccessModal={setShowModifyPwSuccessModal}
          setShowDeleteAccountModal={setShowDeleteAccountModal}
        />
      )}

      {showDeleteAccountModal && (
        <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />
      )}

      {showResetPasswordForm && (
        <ResetPwForm setShowResetPasswordForm={setShowResetPasswordForm} />
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
        <Route path="/Reset-password/:userId" element={<ResetPw />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
