import React, { useEffect } from 'react';
import successIcon from '../../assets/success-icon.png';

const LoginSuccess = ({ setShowSuccessLoginModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessLoginModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setShowSuccessLoginModal]);

  return (
    <div className="success-modal-container modal-container login-success-modal">
      <img src={successIcon} alt="Success log-in" />
      <p>Your are connected !</p>
      <div
        className="btn-container"
        onClick={() => setShowSuccessLoginModal(false)}
      >
        x
      </div>
    </div>
  );
};

export default LoginSuccess;
