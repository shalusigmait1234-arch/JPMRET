import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative z-10 py-20 lg:py-32">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="bg-white p-6 md:p-12 rounded-lg shadow-[0px_7px_18px_rgba(0,0,0,0.13)] -mt-32 md:-mt-48 relative z-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#001e38] mb-4 font-['DM_Serif_Display',serif]">
              Welcome to Janki Prasad Global Governance and Development Foundation
            </h2>
            <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-8"></div>
            
            <div className="space-y-6 max-w-5xl mx-auto">
              <p className="text-[#45443F] text-base md:text-lg leading-relaxed font-medium">
                The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified
                organization, was established in 2010 with the vision of uplifting the poor and marginalized 
                by promoting people's organizations as a cornerstone for achieving a self-reliant community
                and contributing to national progress.
              </p>
              
              <div className="my-8">
                <img 
                  src="/assets/img/aboutus/aboutus.jpg" 
                  className="w-full h-auto rounded-lg shadow-md" 
                  alt="About Us" 
                />
              </div>
              
              <p className="text-[#45443F] text-base md:text-lg leading-relaxed font-medium">
                The Board of Trustees of the JPGGADF is a distinguished group of individuals who brought
                together a wealth of experience, knowledge and a commitment to advancing education and
                social development. Among them are academicians, retired Vice Chancellor and visionaries
                with a deep appreciation for traditional culture.
              </p>
              
              <div className="pt-6">
                <a 
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#001e38] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#bd9143] transition-all duration-300"
                >
                  Read More <i className="icofont-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
