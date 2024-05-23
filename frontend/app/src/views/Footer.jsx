import React from 'react';
import logo from '../assets/logo-full.svg';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="logo-container">
            <img src={logo} alt="FridgeChef" />
          </div>
          <p>
            All rights reserved - Design & developpment by{' '}
            <a href="https://zaenithweb.fr/" target="_blank" rel="noreferrer">
              ZænithWeb
            </a>{' '}
            - Legal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
