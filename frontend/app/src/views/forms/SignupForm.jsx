import React, { useState } from 'react';
import logo from '../../assets/logo-full.svg';

import SuccessSignupModal from '../modals/SignupSuccess';
import ErrorSignupModal from '../modals/SignupError';

const SignUpForm = ({ setShowSignUpForm, setShowLoginForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setShowErrorModal(true);
      return;
    }

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    fetch(`${serverUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
        });
        setShowSuccessModal(true);
        setShowErrorModal(false);
      })
      .catch((error) => {
        console.log('Error when signin-up:', error);
        setShowErrorModal(true);
      });
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
            value={formData.email}
            onChange={handlechange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handlechange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handlechange}
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
        {showSuccessModal && (
          <SuccessSignupModal
            setShowSuccessModal={setShowSuccessModal}
            setShowLoginForm={setShowLoginForm}
            setShowSignUpForm={setShowSignUpForm}
          />
        )}
        {showErrorModal && (
          <ErrorSignupModal
            setShowErrorModal={setShowErrorModal}
            setShowLoginForm={setShowLoginForm}
            setShowSignUpForm={setShowSignUpForm}
          />
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
