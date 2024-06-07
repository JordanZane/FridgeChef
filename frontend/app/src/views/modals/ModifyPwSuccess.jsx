import React, { useEffect } from 'react';
import successIcon from '../../assets/success-icon.png';

const ModifyPwSuccess = ({ setShowModifyPwSuccessModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModifyPwSuccessModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setShowModifyPwSuccessModal]);

  return (
    <div className="success-modal-container modal-container login-success-modal">
      <img src={successIcon} alt="Success log-in" />
      <p>Password modify successfully !</p>
      <div
        className="btn-container"
        onClick={() => setShowModifyPwSuccessModal(false)}
      >
        x
      </div>
    </div>
  );
};

export default ModifyPwSuccess;
