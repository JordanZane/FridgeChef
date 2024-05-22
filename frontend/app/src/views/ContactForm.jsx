import React from 'react';
import logo from '../assets/logo-full.svg';

const ContactForm = ({ setShowContactForm }) => {
  return (
    <div className="contact-form-container">
      <form>
        <h3>
          Contact us <img src={logo} alt="FridgeChef" />
        </h3>
        <button
          className="close-form-btn"
          onClick={() => setShowContactForm(false)}
        >
          x
        </button>
        <div className="form-content">
          <label htmlFor="text">First name*</label>
          <input type="text" name="firstName" id="firstName" required />
        </div>
        <div className="form-content">
          <label htmlFor="text">Last name*</label>
          <input type="text" name="lastName" id="lastName" required />
        </div>
        <div className="form-content">
          <label htmlFor="email">Email*</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-content">
          <label htmlFor="email">Message*</label>
          <textarea name="message" id="message"></textarea>
        </div>
        <p className="required">Required*</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
