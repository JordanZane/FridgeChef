import React, { useEffect } from 'react';
import successIcon from '../../assets/success-icon.png';

const AddToFavorites = ({ setShowAddToFavoriteModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAddToFavoriteModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setShowAddToFavoriteModal]);

  return (
    <div className="success-modal-container modal-container login-success-modal">
      <img src={successIcon} alt="Success add to favorite" />
      <p>Recipe added to favorite</p>
      <div
        className="btn-container"
        onClick={() => setShowAddToFavoriteModal(false)}
      >
        x
      </div>
    </div>
  );
};

export default AddToFavorites;
