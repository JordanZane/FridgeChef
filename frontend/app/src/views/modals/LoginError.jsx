import React from 'react';

const LoginSuccess = ({ setShowErrorLoginModal }) => {
  return (
    <div className="error-modal-container modal-container login-error-modal">
      <p>Email or password invalid</p>
      <div
        className="btn-container"
        onClick={() => setShowErrorLoginModal(false)}
      >
        x
      </div>
    </div>
  );
};

export default LoginSuccess;
