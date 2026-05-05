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

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919935820377"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <i className="icofont-whatsapp"></i>
      </a>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#bd9143] text-white rounded-md flex items-center justify-center shadow-lg hover:bg-[#001e38] transition-all duration-500 transform ${showScroll ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <i className="icofont-arrow-up text-xl"></i>
      </button>
    </div>
  );
};

export default Layout;
