import React, { useState } from 'react';
import { useSubmitInquiryMutation } from '../../../store/api/contactApi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry', // Default subject
    message: ''
  });
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [submitInquiry, { isLoading }] = useSubmitInquiryMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    try {
      await submitInquiry(formData).unwrap();
      setStatusMsg({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setStatusMsg({ 
        type: 'error', 
        text: err?.data?.message || 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <div className="contact-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="contact-form">
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="section-title">
                    <h2 className="font-['DM_Serif_Display',serif]">Let's talk...!</h2>
                    <p>Let’s talk and explore how we can work together to create meaningful impact. Reach out to us to share your thoughts, ask questions.</p>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label><i className="icofont-user-alt-3"></i></label>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="Name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label><i className="icofont-ui-call"></i></label>
                      <input 
                        type="text" 
                        name="phone" 
                        className="form-control" 
                        placeholder="Phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label><i className="icofont-ui-email"></i></label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="Email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label><i className="icofont-comment"></i></label>
                      <textarea 
                        name="message" 
                        className="form-control" 
                        cols="30" 
                        rows="8" 
                        placeholder="Write message" 
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  {statusMsg.text && (
                    <div className={`col-lg-12 mb-4 p-3 rounded text-sm font-semibold ${
                      statusMsg.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {statusMsg.text}
                    </div>
                  )}

                  <div className="col-lg-12">
                    <button type="submit" className="common-btn" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send Message'} <i className="icofont-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d113888.99216154497!2d80.9813931!3d26.870756!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be293119dc895%3A0x27ccd542ed8111f5!2s3%2F132%2C%203%2F132%2C%20Vijayipur%2C%20Vishesh%20Khand%202%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1777380377793!5m2!1sen!2sin"
                width="100%"
                height="530"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
