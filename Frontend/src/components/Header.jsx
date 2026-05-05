import React from 'react';

const Header = () => {
  return (
    <div className="header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-7">
            <div className="left">
              <ul>
                <li>
                  <i className="icofont-envelope"></i>
                  <a href="mailto:info@jpmret.com">info@jpmret.com</a>
                </li>
                <li>
                  <i className="icofont-ui-call"></i>
                  <a href="tel:+915224049534">+91-5224049534,</a>
                  <a href="tel:+919935820377">+91-9935820377</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-5">
            <div className="right">
              <ul>
                <li>
                  <span>Follow Us:</span>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
