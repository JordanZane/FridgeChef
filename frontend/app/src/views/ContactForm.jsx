import React, { useState } from 'react';
import logo from '../assets/logo-full.svg';

const ContactForm = ({ setShowContactForm }) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('Envoi du formulaire...');

    const firstName = userFirstName;
    const lastName = userLastname;
    const email = userEmail;
    const message = userMessage;

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    setEmailSubmitting(true);

    fetch(`${serverUrl}/send-email`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Email send successfully');
          setUserFirstName('');
          setUserLastname('');
          setUserEmail('');
          setUserMessage('');
        } else {
          console.log('Error when sending email');
        }
        setEmailSubmitting(false);
      })
      .catch((error) => {
        console.log('Error when sending email', error);
        setEmailSubmitting(false);
      });
  };

  return (
    <div className="contact-form-container full-layout">
      <form
        id="contact-form"
        className="form-style"
        onSubmit={handleSubmitForm}
      >
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
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="text">Last name*</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userLastname}
            onChange={(e) => setUserLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="text">Message*</label>
          <textarea
            rows="10"
            name="message"
            id="message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <p className="required">Required*</p>
        <button className="submit-form btn-style" type="submit">
          Submit
        </button>
        {emailSubmitting ? 'Envoi en cours' : ''}
      </form>
    </div>
  );
};

export default ContactForm;
