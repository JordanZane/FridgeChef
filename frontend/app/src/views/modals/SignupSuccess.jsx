import React from 'react';

const SignupSuccess = ({
  setShowSuccessModal,
  setShowLoginForm,
  setShowSignUpForm,
}) => {
  return (
    <div className="success-signup-container">
      <p
        onClick={() => {
          setShowSignUpForm(false);
          setShowLoginForm(true);
        }}
      >
        Account create successfully ! Log-in
      </p>

      <div className="btn-container" onClick={() => setShowSuccessModal(false)}>
        x
      </div>
    </div>
  );
};

export default SignupSuccess;
