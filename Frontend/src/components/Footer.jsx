import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, MapPin, Phone, Printer } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Reports', path: '/reports' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const services = [
    { name: 'Agriculture Development', path: '/coverage/agriculture' },
    { name: 'Local Participation', path: '/coverage/local-participation' },
    { name: 'Transform Lives', path: '/coverage/transform-lives' },
    { name: 'Water Management', path: '/coverage/water-management' },
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/', Icon: FaFacebookF },
    { label: 'X', href: 'https://twitter.com/', Icon: FaXTwitter },
    { label: 'YouTube', href: 'https://www.youtube.com/', Icon: FaYoutube },
    { label: 'Instagram', href: 'https://www.instagram.com/', Icon: FaInstagram },
  ];

  return (
    <footer
      className="relative overflow-hidden bg-[#342716] text-white"
      style={{ backgroundImage: "url('/assets/img/banner/footer-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#2b2117]/85"></div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-7 pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.25fr] gap-10 lg:gap-14">
          <div>
            <Link to="/" className="inline-block mb-8">
              <img src="/assets/img/logo/footer-logo.png" alt="JPMRET" className="w-[290px] max-w-full h-auto" />
            </Link>
            <p className="text-white text-[16px] leading-7 max-w-[390px] mb-8 font-medium">
              The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified organization, was established in 2010 with the vision of uplifting the poor and marginalized by promoting people's organizations.
            </p>
            <ul className="flex items-center gap-7">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white hover:text-[#f2b444] transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[24px] leading-7 font-bold text-white mb-8">Quick Links</h3>
            <ul className="space-y-6">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="group inline-flex items-center gap-3 text-[16px] text-white hover:text-[#f2b444] transition-colors font-medium">
                    <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[24px] leading-7 font-bold text-white mb-8">Our Services</h3>
            <ul className="space-y-6">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="group inline-flex items-center gap-3 text-[16px] text-white hover:text-[#f2b444] transition-colors font-medium">
                    <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[24px] leading-7 font-bold text-white mb-8">Contact info</h3>
            <ul className="space-y-6">
              <li>
                <h5 className="text-[#f2b444] font-serif font-bold text-[22px] leading-7 mb-3">Reg. Office:</h5>
                <div className="flex gap-4 text-[16px] text-white font-semibold leading-7">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d5a64a] text-white">
                    <MapPin size={20} fill="currentColor" />
                  </span>
                  <span>Lohiya Nagar, Dist. Maharajganj-273303 Uttar Pradesh (India)</span>
                </div>
              </li>
              <li>
                <h5 className="text-[#f2b444] font-serif font-bold text-[22px] leading-7 mb-3">Corporate Office:</h5>
                <div className="flex gap-4 text-[16px] text-white font-semibold leading-7">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d5a64a] text-white">
                    <MapPin size={20} fill="currentColor" />
                  </span>
                  <span>3/132, Vishesh Khand, Gomti Nagar, Lucknow -226010 Uttar Pradesh (India)</span>
                </div>
              </li>
              <li className="flex items-center gap-4 text-[16px] text-white font-semibold">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d5a64a] text-white">
                  <Printer size={19} />
                </span>
                <a href="tel:+915224049534" className="hover:text-[#f2b444] transition-colors">+91-5224049534</a>
              </li>
              <li className="flex items-center gap-4 text-[16px] text-white font-semibold">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d5a64a] text-white">
                  <Phone size={19} fill="currentColor" />
                </span>
                <a href="tel:+919935820377" className="hover:text-[#f2b444] transition-colors">+91-9935820377</a>
              </li>
              <li className="flex gap-4 text-[16px] text-white font-semibold leading-7">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d5a64a] text-white">
                  <Mail size={20} fill="currentColor" />
                </span>
                <div>
                  <a href="mailto:info@jpmret.com" className="block hover:text-[#f2b444] transition-colors">info@jpmret.com</a>
                  <a href="mailto:jptrust2010@gmail.com" className="block hover:text-[#f2b444] transition-colors">jptrust2010@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/40 py-7">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-7 flex flex-col md:flex-row justify-between items-center text-[16px] text-white font-semibold gap-4">
          <p>Copyright @ 2026 JPMRET. All rights reserved.</p>
          <p>
            Design and Developed by
            <a href="https://www.sigmasoftwares.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2b444] ml-1 transition-colors">
              SigmaIT Software Designers Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
