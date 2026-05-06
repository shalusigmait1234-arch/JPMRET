import React from "react";

const MissionVisionSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-[1170px] mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* Mission Card */}
          <div className="bg-[#001e38] text-white rounded-2xl p-8 text-center shadow-lg h-full flex flex-col transition duration-300 hover:scale-105">

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <i className="fa-solid fa-bullseye text-[#bd9143] text-2xl"></i>
            </div>

            <h3 className="text-2xl mb-3 font-serif bg-[#001e38] !text-white inline-block px-4 py-1 rounded">
              Mission
            </h3>

            <p className="text-gray-200 text-sm leading-relaxed">
              To build self-reliant communities through participation, awareness,
              and inclusive development while empowering marginalized groups,
              especially women and rural populations.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#001e38] text-white rounded-2xl p-8 text-center shadow-lg h-full flex flex-col transition duration-300 hover:scale-105">

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <i className="fa-solid fa-eye text-[#bd9143] text-2xl"></i>
            </div>

            <h3 className="text-2xl mb-3 font-serif bg-[#001e38] text-white inline-block px-4 py-1 rounded">              Vision
            </h3>

            <p className="text-gray-200 text-sm leading-relaxed">
              To empower underprivileged communities and integrate them into
              national development through strong people's organizations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;