import React from 'react';

const SignupError = ({ setShowErrorModal }) => {
  return (
    <div className="error-modal-container modal-container">
      <p>Error : Password & confirm password doesn't match</p>
      <div className="btn-container" onClick={() => setShowErrorModal(false)}>
        x
      </div>
    </div>
  );
};

export default SignupError;
