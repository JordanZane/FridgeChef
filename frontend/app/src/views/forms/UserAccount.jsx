import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import logo from '../../assets/logo-full.svg';

const UserAccount = ({
  setIsUserLogIn,
  setShowSuccessLogoutModal,
  setShowUserAccount,
  setShowModifyPwSuccessModal,
}) => {
  const [userInfos, setUserInfos] = useState(null);
  const [showModifyPasswordForm, setShowModifyPasswordForm] = useState(false);
  const [modifyPasswordformData, setModifyPasswordformData] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const handleShowModifyPasswordForm = () => {
    if (showModifyPasswordForm) {
      setShowModifyPasswordForm(false);
    } else {
      setShowModifyPasswordForm(true);
    }
  };

  const handleChangeModifyPasswordFormData = (e) => {
    const { name, value } = e.target;
    setModifyPasswordformData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModifyPassword = (e) => {
    e.preventDefault();
    if (
      modifyPasswordformData.newPassword !==
      modifyPasswordformData.confirmNewPassword
    ) {
      console.log("Password doesn't match");
      return;
    }
    console.log('Modify password function called');
    const data = {
      password: modifyPasswordformData.password,
      newPassword: modifyPasswordformData.newPassword,
    };
    const userId = localStorage.getItem('userId');
    const token = Cookies.get('token');

    fetch(`${serverUrl}/modify-password/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(data);
        if (response.ok) {
          console.log('Password modify successfully');
          setShowModifyPasswordForm(false);
          setShowModifyPwSuccessModal(true);
          setModifyPasswordformData({
            password: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        } else {
          console.log('Error when trying to modify password');
        }
      })
      .catch((error) => {
        console.log('Error when trying to modify password : ', error);
      });
  };

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
                <button onClick={handleShowModifyPasswordForm}>
                  Modify password
                </button>
                {showModifyPasswordForm && (
                  <form onSubmit={handleModifyPassword}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      onChange={handleChangeModifyPasswordFormData}
                      value={modifyPasswordformData.password}
                    />
                    <label htmlFor="newPassword">New password</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      required
                      onChange={handleChangeModifyPasswordFormData}
                      value={modifyPasswordformData.newPassword}
                    />
                    <label htmlFor="confirmNewPassword">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      required
                      onChange={handleChangeModifyPasswordFormData}
                      value={modifyPasswordformData.confirmNewPassword}
                    />
                    <button type="submit">Confirm</button>
                  </form>
                )}

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
