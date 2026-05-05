import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Coverage', 
      dropdown: [
        { name: 'Agriculture Development', path: '/coverage/agriculture' },
        { name: 'Local participation', path: '/coverage/local-participation' },
        { name: 'Transform lives', path: '/coverage/transform-lives' },
        { name: 'Water Management', path: '/coverage/water-management' },
      ]
    },
    { name: 'Reports', path: '/reports' },
    { 
      name: 'Gallery', 
      dropdown: [
        { name: 'Photo Gallery', path: '/gallery' },
        { name: 'Print Media', path: '/print-media' },
      ]
    },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className={`w-full z-[9999] transition-all duration-500 ${isSticky ? 'fixed top-0 bg-white shadow-lg' : 'relative bg-white'}`}>
      <div className="max-w-[1170px] mx-auto px-4">
        <nav className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/assets/img/logo/logo.jpg" alt="Logo" className="w-[180px] md:w-[250px] h-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center">
              {navLinks.map((link, idx) => (
                <li key={idx} className="relative group px-4 py-6">
                  {link.dropdown ? (
                    <>
                      <button className="flex items-center text-[#302c51] font-semibold text-sm uppercase hover:text-[#bd9143] transition-colors">
                        {link.name} <i className="icofont-simple-down ml-1"></i>
                      </button>
                      <ul className="absolute left-0 top-full w-64 bg-[#00618a] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50">
                        {link.dropdown.map((sub, sIdx) => (
                          <li key={sIdx} className="border-b border-white/10 last:border-0">
                            <Link 
                              to={sub.path} 
                              className="block px-6 py-3 text-white font-medium hover:bg-white/10 hover:pl-8 transition-all duration-300"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`text-[#302c51] font-semibold text-sm uppercase hover:text-[#bd9143] transition-colors ${location.pathname === link.path ? 'text-[#bd9143]' : ''}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-[#302c51] p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <i className="icofont-close text-3xl"></i>
            ) : (
              <i className="icofont-navigation-menu text-3xl"></i>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[1000px] border-t border-gray-100' : 'max-h-0'}`}>
          <ul className="py-4">
            {navLinks.map((link, idx) => (
              <li key={idx} className="border-b border-gray-50 last:border-0">
                {link.dropdown ? (
                  <div>
                    <button 
                      className="flex items-center justify-between w-full px-4 py-3 text-[#302c51] font-semibold"
                      onClick={() => toggleDropdown(link.name)}
                    >
                      {link.name} <i className={`icofont-simple-down transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`}></i>
                    </button>
                    <ul className={`bg-gray-50 overflow-hidden transition-all duration-300 ${activeDropdown === link.name ? 'max-h-64' : 'max-h-0'}`}>
                      {link.dropdown.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link to={sub.path} className="block px-8 py-2 text-sm text-[#302c51] hover:text-[#bd9143]">
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`block px-4 py-3 text-[#302c51] font-semibold ${location.pathname === link.path ? 'text-[#bd9143]' : ''}`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
