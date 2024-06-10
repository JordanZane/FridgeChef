import React, { useState } from 'react';
import logo from '../../assets/logo-full.svg';

import ContactSuccess from '../modals/ContactSuccess';

const ContactForm = ({ setShowContactForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setEmailSubmitting(true);
    console.log('Sending message');

    try {
      const response = await fetch(`${serverUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully:', data);
      } else {
        console.error('Error submitting form:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEmailSubmitting(false);
      setShowSuccessModal(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <div className="forms-container full-layout">
      <form
        id="contact-form"
        className="form-style"
        onSubmit={handleSubmitForm}
      >
        <button
          className="close-form-btn"
          onClick={() => setShowContactForm(false)}
          type="button"
        >
          x
        </button>
        <h3>
          Contact us <img src={logo} alt="FridgeChef" />
        </h3>

        <div className="form-content">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="message">Message*</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>
        <div className="btn-container">
          <button
            className="submit-form btn-style"
            type="submit"
            disabled={emailSubmitting}
          >
            {emailSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {showSuccessModal && (
          <ContactSuccess setShowSuccessModal={setShowSuccessModal} />
        )}
      </form>
    </div>
  );
};

export default ContactForm;
