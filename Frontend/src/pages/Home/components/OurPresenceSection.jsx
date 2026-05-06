import React from "react";

const OurPresenceSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="relative inline-block pb-4">
            Our Presence
            <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-14 h-[2px] bg-[#f06f14]"></span>
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">

          {/* Left Text */}
          <div className="w-full lg:w-5/12">
            <div className="space-y-5 text-[#45443F] text-base lg:text-lg leading-relaxed font-medium">

              <p>
                Our foundation is actively working across key districts of
                <strong className="text-[#001e38]">
                  {" "}Uttar Pradesh and Bihar
                </strong>, reaching thousands of underprivileged communities through impactful development programs.
              </p>

              <p>
                With a strong presence in cities like
                <strong className="text-[#001e38]">
                  {" "}Lucknow (Corporate Office)
                </strong>, Maharajganj, Gorakhpur, Prayagraj, Varanasi region, and extending into Bihar,
                we focus on education, healthcare, livelihood, and social awareness initiatives.
              </p>

              <p>
                Through local participation and sustainable strategies, we aim to create
                long-lasting positive change in rural and semi-urban areas.
              </p>

            </div>
          </div>

          {/* Right Map */}
          <div className="w-full lg:w-7/12 flex justify-center">
            <div className="bg-white rounded-2xl flex justify-center items-center">
              <img
                src="/assets/img/aboutus/map.jpg"
                alt="Presence Map"
                className="w-full h-auto object-contain max-h-[420px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurPresenceSection;