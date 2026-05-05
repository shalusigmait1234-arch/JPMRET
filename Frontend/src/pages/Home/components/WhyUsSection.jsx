import React from 'react';
import { useGetBenefitsQuery } from '../../../store/api/contentApi';

const WhyUsSection = () => {
  const { data: apiBenefits, isLoading } = useGetBenefitsQuery();
  const benefits = [
    { title: "Agriculture development", icon: "fa fa-leaf", desc: "We support farmers with sustainable practices, modern techniques, and resources to improve productivity and strengthen rural livelihoods." },
    { title: "Community participation", icon: "fa fa-users", desc: "We encourage local involvement to build inclusive, community-driven solutions that ensure long-term sustainability." },
    { title: "Water management", icon: "fa fa-tint", desc: "We promote water conservation, efficient usage, and sustainable systems to ensure access to clean water for every community." },
    { title: "Education support", icon: "fa fa-graduation-cap", desc: "We transform lives through education by improving schools and creating better learning opportunities for children." }
  ];

  const displayBenefits = apiBenefits && apiBenefits.length > 0 ? apiBenefits : benefits;

  if (isLoading) {
    return (
      <div className="benefit-area three pt-100 pb-70 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <div className="benefit-area three pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">What Drives Us</span>
          <h2>Our Commitment to Society</h2>
          <div className="custom-underline"></div>
        </div>
        <div className="row g-4 mt-3">
          {displayBenefits.map((benefit, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div className="benefit-item">
                <i className={benefit.icon}></i>
                <h3>{benefit.title}</h3>
                <p>{benefit.description || benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;
