import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const Header = () => {
  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/', Icon: FaFacebookF },
    { label: 'X', href: 'https://twitter.com/', Icon: FaXTwitter },
    { label: 'YouTube', href: 'https://www.youtube.com/', Icon: FaYoutube },
    { label: 'Instagram', href: 'https://www.instagram.com/', Icon: FaInstagram },
  ];

  return (
    <div className="bg-[#001e38] py-2 relative z-[99999]">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-white text-sm">
              <li className="flex items-center gap-2">
                <Mail size={15} aria-hidden="true" />
                <a href="mailto:info@jpmret.com" className="hover:text-[#ff6015] transition-colors">info@jpmret.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} aria-hidden="true" />
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
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-[30px] h-[30px] flex items-center justify-center text-white border border-[#bd9143] rounded-full bg-[#cfa95e] hover:bg-[#ff6015] transition-colors"
                    >
                      <Icon size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
