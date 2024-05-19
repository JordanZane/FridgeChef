import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/logo-full.svg';
import userIcon from '../assets/user-icon.png';
import formIcon from '../assets/form-icon.svg';

const Navigation = ({ isUserLogIn }) => {
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
                <button>
                  Contact
                  <img
                    className="contact-form-button"
                    src={formIcon}
                    alt="Contact Form"
                  />
                </button>
              </li>
              <li>
                <button>
                  <img
                    className="user-icon-button"
                    src={userIcon}
                    alt="Log-in / Sign-up"
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;