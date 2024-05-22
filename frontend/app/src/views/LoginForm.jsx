import React from 'react';
import logo from '../assets/logo-full.svg';

const LoginForm = ({ setShowLogInForm }) => {
  return (
    <div className="login-form-container full-layout">
      <form id="login-form" className="form-style">
        <h3>
          Log-in/<span>Sign-up</span>
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
        <p>
          Doesn’t have an account ? <span>Sign-in</span>
        </p>
        <div className="btn-container">
          <button className="submit-form" type="submit">
            Log-in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
