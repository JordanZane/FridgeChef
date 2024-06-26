import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/logo-full.svg';
import userIcon from '../assets/user-icon.png';
import formIcon from '../assets/form-icon.svg';

const Navigation = ({
  isUserLogIn,
  setShowContactForm,
  setShowLoginForm,
  setShowUserAccount,
}) => {
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
                <NavLink to="/">Recipes</NavLink>
              </li>
              {isUserLogIn && (
                <li>
                  <NavLink to="/my-recipes">My favorites</NavLink>
                </li>
              )}
              <li>
                <button onClick={() => setShowContactForm(true)} type="button">
                  Contact
                  <img
                    className="contact-form-button"
                    src={formIcon}
                    alt="Contact Form"
                  />
                </button>
              </li>
              {isUserLogIn ? (
                <li>
                  <button
                    onClick={() => setShowUserAccount(true)}
                    type="button"
                  >
                    <img
                      className="user-icon-button"
                      src={userIcon}
                      alt="My account"
                    />
                  </button>
                </li>
              ) : (
                <li>
                  <button onClick={() => setShowLoginForm(true)} type="button">
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
