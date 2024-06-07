import React, { useEffect } from 'react';
import successIcon from '../../assets/success-icon.png';

const DeleteAccount = ({ setShowDeleteAccountModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDeleteAccountModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setShowDeleteAccountModal]);

  return (
    <div className="success-modal-container modal-container login-success-modal">
      <img src={successIcon} alt="Success log-out" />
      <p>Your are disconnected !</p>
      <div
        className="btn-container"
        onClick={() => setShowDeleteAccountModal(false)}
      >
        x
      </div>
    </div>
  );
};

export default DeleteAccount;
