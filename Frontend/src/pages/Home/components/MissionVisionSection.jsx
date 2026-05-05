import React from 'react';

const MissionVisionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-center">
          {/* Mission Card */}
          <div className="group bg-[#f9faff] p-8 md:p-12 rounded-2xl border border-blue-50 hover:border-[#bd9143] hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-[#001e38] text-white rounded-xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <h4 className="text-2xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Our Mission</h4>
            <p className="text-[#45443F] text-lg leading-relaxed">
              To build self-reliant communities through participation, awareness, and inclusive development while empowering marginalized groups, especially women and rural populations.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group bg-[#fff9f4] p-8 md:p-12 rounded-2xl border border-orange-50 hover:border-[#bd9143] hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-[#bd9143] text-white rounded-xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
              <i className="fa-solid fa-eye"></i>
            </div>
            <h4 className="text-2xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Our Vision</h4>
            <p className="text-[#45443F] text-lg leading-relaxed">
              To empower underprivileged communities and integrate them into national development through strong people's organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
