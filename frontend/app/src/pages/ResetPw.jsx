import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import logo from '../assets/logo-full.svg';

const ResetPw = ({ setShowModifyPwSuccessModal }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitResetPasswordForm = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      console.log('password doesnt match');
      return;
    }
    console.log('Submitting reset password form function called');

    fetch(`${serverUrl}/reset-password/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: formData.newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Password reset successfully:', response);
          setShowModifyPwSuccessModal(true);
          navigate('/');
        } else {
          return response.json().then((data) => {
            console.log('Error when trying to reset password:', data);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <main className="reset-pw-page">
      <div className="forms-container full-layout">
        <form className="form-style" onSubmit={handleSubmitResetPasswordForm}>
          <h3>
            Reset your password
            <img src={logo} alt="FridgeChef" />
          </h3>
          <div className="form-content">
            <label htmlFor="newPassword">New password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              required
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="confirmNewPassword">Confirm new password</label>
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              required
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </div>
          <div className="btn-container">
            <button className="submit-form btn-style" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResetPw;
