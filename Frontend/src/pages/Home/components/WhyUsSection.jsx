import React from 'react';
import { useGetBenefitsQuery } from '../../../store/api/contentApi';

const WhyUsSection = () => {
  const { data: apiBenefits, isLoading } = useGetBenefitsQuery();
  const defaultBenefits = [
    { title: "Agriculture development", icon: "fa fa-leaf", desc: "We support farmers with sustainable practices, modern techniques, and resources to improve productivity and strengthen rural livelihoods." },
    { title: "Community participation", icon: "fa fa-users", desc: "We encourage local involvement to build inclusive, community-driven solutions that ensure long-term sustainability." },
    { title: "Water management", icon: "fa fa-tint", desc: "We promote water conservation, efficient usage, and sustainable systems to ensure access to clean water for every community." },
    { title: "Education support", icon: "fa fa-graduation-cap", desc: "We transform lives through education by improving schools and creating better learning opportunities for children." }
  ];

  const displayBenefits = apiBenefits && apiBenefits.length > 0 ? apiBenefits : defaultBenefits;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#bd9143] text-xl font-medium uppercase tracking-widest mb-4 block">What Drives Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Our Commitment to Society</h2>
          <div className="w-16 h-[2px] bg-[#f06f14] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayBenefits.map((benefit, i) => (
            <div key={i} className="group p-8 bg-gray-50 rounded-2xl hover:bg-[#001e38] hover:shadow-2xl transition-all duration-500 text-center">
              <div className="w-16 h-16 bg-white text-[#bd9143] rounded-full flex items-center justify-center text-2xl mb-6 mx-auto group-hover:bg-[#bd9143] group-hover:text-white transition-all duration-500 shadow-md">
                <i className={benefit.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-[#001e38] group-hover:text-white mb-4 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-[#45443F] group-hover:text-gray-300 text-sm leading-relaxed transition-colors">
                {benefit.description || benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
