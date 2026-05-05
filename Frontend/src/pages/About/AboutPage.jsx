import React from 'react';
import AboutHero from './components/AboutHero';
import AboutContent from './components/AboutContent';

const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutContent />
    </div>
  );
};

export default AboutPage;
