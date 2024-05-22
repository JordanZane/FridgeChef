import React, { useState } from 'react';
import logo from '../assets/logo-full.svg';

const LoginForm = ({ setShowLogInForm }) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <>
      <div className="forms-container full-layout">
        {!showSignUpForm ? (
          <form id="login-form" className="form-style">
            <h3>
              Log-in/
              <span onClick={() => setShowSignUpForm(true)}>Sign-up</span>
              <img src={logo} alt="FridgeChef" />
            </h3>
            <button
              className="close-form-btn"
              onClick={() => setShowLogInForm(false)}
            >
              x
            </button>
            <div className="form-content">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className="form-content">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
            </div>
            <p>Forget your password ?</p>
            <p onClick={() => setShowSignUpForm(true)}>
              Doesn’t have an account ? Sign-up
            </p>
            <div className="btn-container">
              <button className="submit-form" type="submit">
                Log-in
              </button>
            </div>
          </form>
        ) : (
          <form id="signup-form" className="form-style">
            <h3>
              <span onClick={() => setShowSignUpForm(false)}>Log-in/</span>
              Sign-up
              <img src={logo} alt="FridgeChef" />
            </h3>
            <button
              className="close-form-btn"
              onClick={() => setShowLogInForm(false)}
            >
              x
            </button>
            <div className="form-content">
              <label htmlFor="email">Email*</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className="form-content">
              <label htmlFor="email">Password*</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className="form-content">
              <label htmlFor="password">Confirm Password*</label>
              <input type="password" name="password" id="password" required />
            </div>
            <p onClick={() => setShowSignUpForm(false)}>
              Already have an account? Log-in
            </p>
            <div className="btn-container">
              <button className="submit-form" type="submit">
                Sign-up
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginForm;
