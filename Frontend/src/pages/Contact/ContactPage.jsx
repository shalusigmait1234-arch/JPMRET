import React from 'react';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Page Title Area */}
      <div className="page-title-area title-bg-one">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="title-item">
                <h2>Contact Us</h2>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><span>Contact Us</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactInfo />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
