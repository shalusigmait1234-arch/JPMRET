import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#001e38] text-white pt-20">
      <div className="max-w-[1170px] mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src="/assets/img/logo/logo.jpg" alt="Logo" className="w-[200px] h-auto rounded bg-white p-1" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified organization, was established in 2010 with the vision of uplifting the poor and marginalized by promoting people's organizations.
            </p>
            <ul className="flex items-center gap-3">
              <li>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:bg-[#ff6015] hover:border-transparent transition-all">
                  <i className="fa-brands fa-facebook-f text-xs"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:bg-[#ff6015] hover:border-transparent transition-all">
                  <i className="fa-brands fa-x-twitter text-xs"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:bg-[#ff6015] hover:border-transparent transition-all">
                  <i className="fa-brands fa-youtube text-xs"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:bg-[#ff6015] hover:border-transparent transition-all">
                  <i className="fa-brands fa-instagram text-xs"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:height-[2px] after:bg-[#bd9143]">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Reports', 'Gallery', 'Downloads', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-') === 'home' ? '' : item.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-[#bd9143] hover:pl-2 transition-all flex items-center gap-2 text-sm">
                    <i className="icofont-simple-right text-xs"></i> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:height-[2px] after:bg-[#bd9143]">Our Services</h3>
            <ul className="space-y-4">
              {[
                { name: 'Agriculture Development', path: '/coverage/agriculture' },
                { name: 'Local Participation', path: '/coverage/local-participation' },
                { name: 'Transform Lives', path: '/coverage/transform-lives' },
                { name: 'Water Management', path: '/coverage/water-management' },
              ].map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="text-gray-300 hover:text-[#bd9143] hover:pl-2 transition-all flex items-center gap-2 text-sm">
                    <i className="icofont-simple-right text-xs"></i> {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:height-[2px] after:bg-[#bd9143]">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <h5 className="text-[#f1b448] font-bold text-sm mb-1 uppercase tracking-wider">Reg. Office:</h5>
                <div className="flex gap-3 text-sm text-gray-300">
                  <i className="icofont-location-pin text-[#bd9143] mt-1"></i>
                  <span>Lohiya Nagar, Dist. Maharajganj-273303 Uttar Pradesh (India)</span>
                </div>
              </li>
              <li>
                <h5 className="text-[#f1b448] font-bold text-sm mb-1 uppercase tracking-wider">Corporate Office:</h5>
                <div className="flex gap-3 text-sm text-gray-300">
                  <i className="icofont-location-pin text-[#bd9143] mt-1"></i>
                  <span>3/132, Vishesh Khand, Gomti Nagar, Lucknow -226010 Uttar Pradesh (India)</span>
                </div>
              </li>
              <li className="flex gap-3 text-sm text-gray-300">
                <i className="fa-solid fa-tty text-[#bd9143]"></i>
                <a href="tel:+91-5224049534" className="hover:text-white">+91-5224049534</a>
              </li>
              <li className="flex gap-3 text-sm text-gray-300">
                <i className="icofont-ui-call text-[#bd9143]"></i>
                <a href="tel:+91-9935820377" className="hover:text-white">+91-9935820377</a>
              </li>
              <li className="flex flex-col gap-2 text-sm text-gray-300">
                <div className="flex gap-3">
                  <i className="icofont-envelope text-[#bd9143]"></i>
                  <a href="mailto:info@jpmret.com" className="hover:text-white">info@jpmret.com</a>
                </div>
                <a href="mailto:jptrust2010@gmail.com" className="pl-8 hover:text-white">jptrust2010@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1170px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
          <p>Copyright @ 2026 JPMRET. All rights reserved.</p>
          <p>
            Design and Developed by 
            <a href="https://www.sigmasoftwares.org/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#bd9143] ml-1">
              SigmaIT Software Designers Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
