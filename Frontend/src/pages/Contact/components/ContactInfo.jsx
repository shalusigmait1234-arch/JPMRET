import React from 'react';

const ContactInfo = () => {
  return (
    <div className="contact-info-area pt-100 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="contact-info">
              <i className="icofont-location-pin"></i>
              <span>Reg. Office:</span>
              <a href="#">Lohiya Nagar, Dist. Maharajganj-273303 Uttar Pradesh (India)</a>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="contact-info">
              <i className="icofont-location-pin"></i>
              <span>Corporate Office:</span>
              <a href="#">3/132, Vishesh Khand, Gomti Nagar, Lucknow -226010 Uttar Pradesh (India)</a>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="contact-info">
              <i className="icofont-ui-call"></i>
              <span>Phone:</span>
              <a href="tel:+915224049534">+91-5224049534</a>
              <a href="tel:+919935820377">+91-9935820377</a>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="contact-info">
              <i className="icofont-ui-email"></i>
              <span>Email:</span>
              <a href="mailto:info@jpmret.com">info@jpmret.com</a>
              <a href="mailto:jptrust2010@gmail.com">jptrust2010@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
