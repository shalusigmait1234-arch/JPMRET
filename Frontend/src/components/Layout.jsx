import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const [showScroll, setShowScroll] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* WhatsApp Button - Original Class */}
      <a
        href="https://wa.me/919935820377"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp"
      >
        <i className="icofont-whatsapp"></i>
      </a>

      {/* Back to Top - Original Class */}
      <div
        onClick={scrollToTop}
        className={`go-top ${showScroll ? 'active' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        <i className="icofont-arrow-up"></i>
        <i className="icofont-arrow-up"></i>
      </div>
    </div>
  );
};

export default Layout;
