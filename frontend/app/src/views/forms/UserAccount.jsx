import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import logo from '../../assets/logo-full.svg';

const UserAccount = ({
  setIsUserLogIn,
  setShowSuccessLogoutModal,
  setShowUserAccount,
}) => {
  const [userInfos, setUserInfos] = useState(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const getUserInfos = async () => {
    const token = Cookies.get('token');
    const userId = localStorage.getItem('userId');

    fetch(`${serverUrl}/get-user-infos/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to get user infos');
        }

        return response.json();
      })
      .then((data) => {
        console.log('Get user infos : ', data);
        setUserInfos(data.user);
      })
      .catch((error) => {
        console.log('Error when getting user infos : ', error);
      });
  };

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

  useEffect(() => {
    getUserInfos();
  }, []);

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
            {userInfos && (
              <>
                <p>Email : {userInfos.email}</p>
                <button>Modify password</button>
                <button>Delete my account</button>
              </>
            )}
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
