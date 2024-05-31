import React, { useState } from 'react';
import logo from '../../assets/logo-full.svg';

const LoginForm = ({ setShowLoginForm, setShowSignUpForm }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login submit');
  };

  return (
    <div className="forms-container full-layout">
      <form id="login-form" className="form-style" onSubmit={handleLogin}>
        <h3>
          Log-in/
          <span
            onClick={() => {
              setShowLoginForm(false);
              setShowSignUpForm(true);
            }}
          >
            Sign-up
          </span>
          <img src={logo} alt="FridgeChef" />
        </h3>
        <button
          className="close-form-btn"
          onClick={() => setShowLoginForm(false)}
        >
          x
        </button>
        <div className="form-content">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <p>Forget your password?</p>
        <p
          onClick={() => {
            setShowLoginForm(false);
            setShowSignUpForm(true);
          }}
        >
          Doesn’t have an account? Sign-up
        </p>
        <div className="btn-container">
          <button className="submit-form btn-style" type="submit">
            Log-in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
