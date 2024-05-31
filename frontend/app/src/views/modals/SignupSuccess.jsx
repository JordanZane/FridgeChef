import React from 'react';

const SignupSuccess = ({
  setShowSuccessModal,
  setShowLoginForm,
  setShowSignUpForm,
}) => {
  return (
    <div className="success-signup-container modal-container">
      <p>
        <span
          onClick={() => {
            setShowSignUpForm(false);
            setShowLoginForm(true);
          }}
        >
          {' '}
          Account create successfully ! Log-in
        </span>
      </p>

      <div className="btn-container" onClick={() => setShowSuccessModal(false)}>
        x
      </div>
    </div>
  );
};

export default SignupSuccess;
