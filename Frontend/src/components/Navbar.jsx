import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (e, name) => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  return (
    <div className="navbar-area sticky-top">
      {/* Mobile Nav */}
      <div className="mobile-nav">
        <Link to="/" className="logo">
          <img src="/assets/img/logo/logo.jpg" alt="Logo" />
        </Link>
        
        <div className="mean-container">
          <div className="mean-bar">
            <a 
              href="#" 
              className={`meanmenu-reveal ${isMenuOpen ? 'meanclose' : ''}`} 
              onClick={(e) => { e.preventDefault(); toggleMenu(); }}
              style={{ right: '0', left: 'auto', textAlign: 'center', textIndent: '0px', fontSize: '18px' }}
            >
              {isMenuOpen ? 'X' : (
                <>
                  <span></span><span></span><span></span>
                </>
              )}
            </a>
            
            <nav className="mean-nav" style={{ display: isMenuOpen ? 'block' : 'none' }}>
              <ul className="navbar-nav">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/about" className="nav-link">About Us</Link></li>
                <li className="nav-item">
                  <a href="#" className="nav-link dropdown-toggle" onClick={(e) => toggleDropdown(e, 'coverage')}>
                    Coverage <i className="icofont-simple-down"></i>
                  </a>
                  <ul className="dropdown-menu" style={{ display: activeDropdown === 'coverage' ? 'block' : 'none' }}>
                    <li><Link to="/coverage/agriculture" className="nav-link">Agriculture Development</Link></li>
                    <li><Link to="/coverage/local-participation" className="nav-link">Local participation</Link></li>
                    <li><Link to="/coverage/transform-lives" className="nav-link">Transform lives</Link></li>
                    <li><Link to="/coverage/water-management" className="nav-link">Water Management</Link></li>
                  </ul>
                  <a className="mean-expand" href="#" onClick={(e) => toggleDropdown(e, 'coverage')}>{activeDropdown === 'coverage' ? '-' : '+'}</a>
                </li>
                <li className="nav-item"><Link to="/reports" className="nav-link">Reports</Link></li>
                <li className="nav-item">
                  <a href="#" className="nav-link dropdown-toggle" onClick={(e) => toggleDropdown(e, 'gallery')}>
                    Gallery <i className="icofont-simple-down"></i>
                  </a>
                  <ul className="dropdown-menu" style={{ display: activeDropdown === 'gallery' ? 'block' : 'none' }}>
                    <li><Link to="/gallery" className="nav-link">Photo Gallery</Link></li>
                    <li><Link to="/print-media" className="nav-link">Print Media</Link></li>
                  </ul>
                  <a className="mean-expand" href="#" onClick={(e) => toggleDropdown(e, 'gallery')}>{activeDropdown === 'gallery' ? '-' : '+'}</a>
                </li>
                <li className="nav-item"><Link to="/downloads" className="nav-link">Downloads</Link></li>
                <li className="nav-item last-child"><Link to="/contact" className="nav-link">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`main-nav five-color-border ${isSticky ? 'menu-shrink' : ''}`}>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand" to="/">
              <img src="/assets/img/logo/logo.jpg" className="logo-one" alt="Logo" />
              <img src="/assets/img/logo/logo.jpg" className="logo-two" alt="Logo" />
            </Link>
            
            <div className="navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link dropdown-toggle">Coverage <i className="icofont-simple-down"></i></a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><Link to="/coverage/agriculture" className="nav-link">Agriculture Development</Link></li>
                    <li className="nav-item"><Link to="/coverage/local-participation" className="nav-link">Local participation</Link></li>
                    <li className="nav-item"><Link to="/coverage/transform-lives" className="nav-link">Transform lives</Link></li>
                    <li className="nav-item"><Link to="/coverage/water-management" className="nav-link">Water Management</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/reports" className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}>Reports</Link>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link dropdown-toggle">Gallery <i className="icofont-simple-down"></i></a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><Link to="/gallery" className="nav-link">Photo Gallery</Link></li>
                    <li className="nav-item"><Link to="/print-media" className="nav-link">Print Media</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/downloads" className={`nav-link ${location.pathname === '/downloads' ? 'active' : ''}`}>Downloads</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
