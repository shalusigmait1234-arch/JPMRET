import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import OurPresenceSection from './components/OurPresenceSection';
import MissionVisionSection from './components/MissionVisionSection';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <OurPresenceSection />
      <MissionVisionSection />
      <ServicesSection />
      <WhyUsSection />
      <GallerySection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
