import React, { useState } from 'react';
import logo from '../../assets/logo-full.svg';
import LoginError from '../modals/LoginError';

const LoginForm = ({
  setShowLoginForm,
  setShowSignUpForm,
  setIsUserLogIn,
  setShowSuccessLoginModal,
  setShowResetPasswordForm,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showErrorLoginModal, setShowErrorLoginModal] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login submit');

    if (!formData.email || !formData.password) {
      return;
    }
    fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }

        return response.json();
      })
      .then((data) => {
        console.log('User logged in');
        setIsUserLogIn(true);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('userId', data.userId);
        setFormData({
          email: '',
          password: '',
        });
        setShowLoginForm(false);
        setShowSuccessLoginModal(true);
      })
      .catch((error) => {
        setShowErrorLoginModal(true);
        console.log('Error when logging in: ', error);
      });
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
          type="button"
        >
          x
        </button>
        <div className="form-content">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <p
          onClick={() => {
            setShowResetPasswordForm(true);
            setShowLoginForm(false);
          }}
        >
          Forget your password?
        </p>
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
        {showErrorLoginModal && (
          <LoginError setShowErrorLoginModal={setShowErrorLoginModal} />
        )}
      </form>
    </div>
  );
};

export default LoginForm;
