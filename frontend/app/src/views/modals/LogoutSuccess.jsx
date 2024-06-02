import React, { useEffect } from 'react';
import successIcon from '../../assets/success-icon.png';

const LogoutSuccess = ({ setShowSuccessLogoutModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessLogoutModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setShowSuccessLogoutModal]);

  return (
    <div className="success-modal-container modal-container login-success-modal">
      <img src={successIcon} alt="Success log-out" />
      <p>Your are disconnected !</p>
      <div
        className="btn-container"
        onClick={() => setShowSuccessLogoutModal(false)}
      >
        x
      </div>
    </div>
  );
};

export default LogoutSuccess;
