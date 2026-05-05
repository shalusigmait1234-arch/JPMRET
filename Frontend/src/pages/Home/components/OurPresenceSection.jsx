import React from 'react';

const OurPresenceSection = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#001e38] font-['DM_Serif_Display',serif] relative inline-block pb-4 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#f06f14]">
            Our Presence
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-5/12">
            <div className="space-y-6 text-[#45443F] text-lg leading-relaxed font-medium">
              <p>
                Our foundation is actively working across key districts of
                <strong className="text-[#001e38]"> Uttar Pradesh and Bihar</strong>, reaching thousands of
                underprivileged communities through impactful development programs.
              </p>
              <p>
                With a strong presence in cities like <strong className="text-[#001e38]">Lucknow (Corporate Office)</strong>,
                Maharajganj, Gorakhpur, Prayagraj, Varanasi region, and extending into Bihar,
                we focus on education, healthcare, livelihood, and social awareness initiatives.
              </p>
              <p>
                Through local participation and sustainable strategies, we aim to create
                long-lasting positive change in rural and semi-urban areas.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="/assets/img/aboutus/map.jpg" 
                className="w-full h-auto rounded-lg" 
                alt="Presence Map" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPresenceSection;
