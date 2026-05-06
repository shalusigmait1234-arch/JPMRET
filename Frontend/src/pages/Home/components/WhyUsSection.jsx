import React from 'react';
import { useGetBenefitsQuery } from '../../../store/api/contentApi';

const WhyUsSection = () => {
  const { data: apiBenefits, isLoading } = useGetBenefitsQuery();

  const defaultBenefits = [
    {
      title: "Agriculture development",
      icon: "fa fa-leaf",
      desc: "We support farmers with sustainable practices, modern techniques, and resources to improve productivity and strengthen rural livelihoods."
    },
    {
      title: "Community participation",
      icon: "fa fa-users",
      desc: "We encourage local involvement to build inclusive, community-driven solutions that ensure long-term sustainability."
    },
    {
      title: "Water management",
      icon: "fa fa-tint",
      desc: "We promote water conservation, efficient usage, and sustainable systems to ensure access to clean water for every community."
    },
    {
      title: "Education support",
      icon: "fa fa-graduation-cap",
      desc: "We transform lives through education by improving schools and creating better learning opportunities for children."
    }
  ];

  const displayBenefits =
    apiBenefits && apiBenefits.length > 0 ? apiBenefits : defaultBenefits;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-[1170px] mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-[#c89d4f] text-sm font-semibold uppercase tracking-[3px] block mb-3">
            What Drives Us
          </span>

          <h2 className="text-3xl md:text-5xl text-[#0b2c4d] font-serif font-semibold mb-4">
            Our Commitment to Society
          </h2>

          <div className="w-12 h-[2px] bg-[#c89d4f] mx-auto"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBenefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#0b2c4d] text-white rounded-full flex items-center justify-center text-xl mx-auto mb-6">
                <i className={benefit.icon}></i>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0b2c4d] mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
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