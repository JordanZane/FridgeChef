import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo-full.svg';

const UserAccount = ({
  setIsUserLogIn,
  setShowSuccessLogoutModal,
  setShowUserAccount,
}) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('log out function called');
    fetch(`${serverUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(() => {
        setIsUserLogIn(false);
        localStorage.removeItem('isLogged');
        localStorage.removeItem('userId');
        setShowUserAccount(false);
        setShowSuccessLogoutModal(true);
        navigate(`/`);
      })
      .catch((error) => {
        console.error('Error when logging out: ', error);
      });
  };
  return (
    <div>
      <div className="forms-container full-layout user-account-container">
        <div className="form-style">
          <button
            onClick={() => setShowUserAccount(false)}
            className="close-form-btn"
          >
            x
          </button>
          <h3>
            My account
            <img src={logo} alt="FridgeChef" />
          </h3>
          <div className="user-infos">
            <p>Email :</p>
            <p>Password :</p>
            <button>Modify password</button>
            <button>Delete my account</button>
          </div>
          <button onClick={handleLogout} className="log-out-btn">
            Log-out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
