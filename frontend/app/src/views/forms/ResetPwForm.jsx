import React, { useState } from 'react';
import logo from '../../assets/logo-full.svg';

const ResetPwForm = ({ setShowResetPasswordForm }) => {
  const [userEmail, setUserEmail] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSendEmailResetPw = async (e) => {
    e.preventDefault();
    console.log('Handle reset password by email function called');
    setEmailSubmitting(true);
    try {
      const response = await fetch(`${serverUrl}/send-email/reset-pw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Email sending successfully:', data);
      } else {
        console.error('Error submitting message:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <div className="forms-container full-layout">
      <form
        id="reset-pw-form"
        className="form-style"
        onSubmit={handleSendEmailResetPw}
      >
        <h3>
          Reset password <img src={logo} alt="FridgeChef" />
        </h3>

        <button
          onClick={() => setShowResetPasswordForm(false)}
          className="close-form-btn"
        >
          x
        </button>
        <div className="form-content">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button className="submit-form btn-style" type="submit">
            {emailSubmitting ? 'Submitting...' : 'Reset password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPwForm;
