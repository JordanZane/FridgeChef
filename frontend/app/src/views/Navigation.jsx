import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/logo-full.svg';
import userIcon from '../assets/user-icon.png';
import formIcon from '../assets/form-icon.svg';

const Navigation = ({
  isUserLogIn,
  setShowContactForm,
  setShowLoginForm,
  setIsUserLogIn,
  setShowSuccessLogoutModal,
}) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleLogout = () => {
    fetch(`${serverUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(() => {
        setIsUserLogIn(false);
        localStorage.removeItem('isLogged');
        localStorage.removeItem('userId');
        setShowSuccessLogoutModal(true);
      })
      .catch((error) => {
        console.error('Error when logging out: ', error);
      });
  };
  return (
    <header>
      <div className="container">
        <div className="navigation">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="FridgeChef" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {isUserLogIn && (
                <li>
                  <NavLink to="/my-recipes">My recipes</NavLink>
                </li>
              )}
              <li>
                <button onClick={() => setShowContactForm(true)}>
                  Contact
                  <img
                    className="contact-form-button"
                    src={formIcon}
                    alt="Contact Form"
                  />
                </button>
              </li>
              {isUserLogIn ? (
                <li onClick={handleLogout}>
                  <button className="log-out-btn">Log-out</button>
                </li>
              ) : (
                <li>
                  <button onClick={() => setShowLoginForm(true)}>
                    <img
                      className="user-icon-button"
                      src={userIcon}
                      alt="Log-in / Sign-up"
                    />
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
