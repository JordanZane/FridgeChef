import React from 'react';

const ContactSuccess = ({ setShowSuccessModal }) => {
  return (
    <div className="success-modal-container modal-container">
      <p>Email send successfully !</p>
      <div className="btn-container" onClick={() => setShowSuccessModal(false)}>
        x
      </div>
    </div>
  );
};

export default ContactSuccess;
