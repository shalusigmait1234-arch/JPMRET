import React from 'react';

const AboutContent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif] leading-tight">
              Welcome to Janki Prasad Global Governance and Development Foundation
            </h2>
            <div className="w-16 h-[2px] bg-[#f06f14] mb-8"></div>
            
            <div className="space-y-6 text-[#45443F] text-lg leading-relaxed font-medium">
              <p>
                The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified
                organization, was established in 2010 with the vision of uplifting the poor and marginalized 
                by promoting people's organizations as a cornerstone for achieving a self-reliant community
                and contributing to national progress.
              </p>
              <p>
                The Board of Trustees of the JPGGADF is a distinguished group of individuals who brought
                together a wealth of experience, knowledge and a commitment to advancing education and
                social development. Among them are academicians, retired Vice Chancellor and visionaries
                with a deep appreciation for traditional culture.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-5/12 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors -z-10"></div>
              <img 
                src="/assets/img/aboutus/about2.png" 
                className="w-full h-auto rounded-lg shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                alt="About Us" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
