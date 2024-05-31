import React, { useState } from 'react';
import logo from '../assets/logo-full.svg';

const SignUpForm = ({ setShowSignUpForm, setShowLoginForm }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <div className="forms-container full-layout">
      <form id="signup-form" className="form-style" onSubmit={handleSignup}>
        <h3>
          <span
            onClick={() => {
              setShowSignUpForm(false);
              setShowLoginForm(true);
            }}
          >
            Log-in/
          </span>
          Sign-up
          <img src={logo} alt="FridgeChef" />
        </h3>
        <button
          className="close-form-btn"
          onClick={() => setShowSignUpForm(false)}
        >
          x
        </button>
        <div className="form-content">
          <label htmlFor="email">Email*</label>
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
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={userConfirmPassword}
            onChange={(e) => setUserConfirmPassword(e.target.value)}
            required
          />
        </div>
        <p
          onClick={() => {
            setShowSignUpForm(false);
            setShowLoginForm(true);
          }}
        >
          Already have an account? Log-in
        </p>
        <div className="btn-container">
          <button className="submit-form btn-style" type="submit">
            Sign-up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
