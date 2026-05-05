import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-area pt-100">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-4">
            <div className="footer-item">
              <div className="footer-logo">
                <Link className="logo" to="/">
                  <img src="/assets/img/logo/footer-logo.png" alt="Logo" />
                </Link>
                <p>The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified organization, was established in 2010 with the vision of uplifting the poor and marginalized by promoting people's organizations.</p>
                <ul>
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
          <div className="col-sm-6 col-lg-2">
            <div className="footer-item">
              <div className="footer-links">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link to="/"><i className="icofont-simple-right"></i> Home</Link></li>
                  <li><Link to="/about"><i className="icofont-simple-right"></i> About Us</Link></li>
                  <li><Link to="/reports"><i className="icofont-simple-right"></i> Reports</Link></li>
                  <li><Link to="/gallery"><i className="icofont-simple-right"></i> Gallery</Link></li>
                  <li><Link to="/downloads"><i className="icofont-simple-right"></i> Downloads</Link></li>
                  <li><Link to="/contact"><i className="icofont-simple-right"></i> Contact Us</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-item">
              <div className="footer-links">
                <h3>Our Services</h3>
                <ul>
                  <li><Link to="/coverage/agriculture"><i className="icofont-simple-right"></i> Agriculture Development</Link></li>
                  <li><Link to="/coverage/local-participation"><i className="icofont-simple-right"></i> Local Participation</Link></li>
                  <li><Link to="/coverage/transform-lives"><i className="icofont-simple-right"></i> Transform Lives</Link></li>
                  <li><Link to="/coverage/water-management"><i className="icofont-simple-right"></i> Water Management</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-item">
              <div className="footer-contact">
                <h3>Contact info</h3>
                <div className="contact-inner">
                  <ul>
                    <h5 style={{ color: '#f1b448' }}>Reg. Office:</h5>
                    <li>
                      <i className="icofont-location-pin"></i>
                      <a href="#">Lohiya Nagar, Dist. Maharajganj-273303 Uttar Pradesh (India)</a>
                    </li>
                    <h5 style={{ color: '#f1b448' }}>Corporate Office:</h5>
                    <li>
                      <i className="icofont-location-pin"></i>
                      <a href="#">3/132, Vishesh Khand, Gomti Nagar, Lucknow -226010 Uttar Pradesh (India)</a>
                    </li>
                    <li>
                      <i className="fa-solid fa-tty"></i>
                      <a href="tel:+91-5224049534">+91-5224049534</a>
                    </li>
                    <li>
                      <i className="icofont-ui-call"></i>
                      <a href="tel:+91-9935820377">+91-9935820377</a>
                    </li>
                    <li className="d-block">
                      <i className="icofont-envelope"></i>
                      <a href="mailto:info@jpmret.com">info@jpmret.com</a>
                      <br />
                      <a className="pl45" href="mailto:jptrust2010@gmail.com" style={{ paddingLeft: '28px' }}>jptrust2010@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <p>Copyright @ 2026 JPMRET. All rights reserved.</p>
              </div>
              <div className="col-lg-6">
                <p className="copy-right">
                  Design and Developed by <a href="https://www.sigmasoftwares.org/" title="" target="_blank" rel="noopener noreferrer">
                    &nbsp;SigmaIT Software Designers Pvt. Ltd.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
