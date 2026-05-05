import React from 'react';

const Header = () => {
  return (
    <div className="bg-[#001e38] py-2 relative z-[99999]">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-white text-sm">
              <li className="flex items-center gap-2">
                <i className="icofont-envelope text-white text-[15px]"></i>
                <a href="mailto:info@jpmret.com" className="hover:text-[#ff6015] transition-colors">info@jpmret.com</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="icofont-ui-call text-white text-[15px]"></i>
                <div className="flex gap-1">
                  <a href="tel:+915224049534" className="hover:text-[#ff6015] transition-colors">+91-5224049534,</a>
                  <a href="tel:+919935820377" className="hover:text-[#ff6015] transition-colors">+91-9935820377</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex justify-center md:justify-end items-center gap-4">
              <span className="text-white text-sm">Follow Us:</span>
              <ul className="flex items-center gap-2">
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" 
                     className="w-[30px] h-[30px] flex items-center justify-center text-white border border-[#bd9143] rounded-full bg-[#cfa95e] hover:bg-[#ff6015] transition-colors text-[13px]">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" 
                     className="w-[30px] h-[30px] flex items-center justify-center text-white border border-[#bd9143] rounded-full bg-[#cfa95e] hover:bg-[#ff6015] transition-colors text-[13px]">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" 
                     className="w-[30px] h-[30px] flex items-center justify-center text-white border border-[#bd9143] rounded-full bg-[#cfa95e] hover:bg-[#ff6015] transition-colors text-[13px]">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" 
                     className="w-[30px] h-[30px] flex items-center justify-center text-white border border-[#bd9143] rounded-full bg-[#cfa95e] hover:bg-[#ff6015] transition-colors text-[13px]">
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
