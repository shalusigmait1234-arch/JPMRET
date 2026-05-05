import React from 'react';
import { useGetServicesQuery } from '../../../store/api/contentApi';

const defaultServices = [
  { title: "Agriculture development", image: "/assets/img/work/cause-1.jpg", link: "/coverage/agriculture", description: "We promote sustainable farming practices and support farmers with knowledge and resources to improve productivity, increase income." },
  { title: "Local participation and sustainability", image: "/assets/img/work/cause-2.jpg", link: "/coverage/local-participation", description: "We encourage active community involvement to create sustainable solutions that are inclusive, long-lasting, and driven by local." },
  { title: "Transform lives one school at a time", image: "/assets/img/work/cause-3.jpg", link: "/coverage/transform-lives", description: "We work to improve education by supporting schools, enhancing learning environments, and creating opportunities." },
  { title: "Water management", image: "/assets/img/work/cause-4.jpg", link: "/coverage/water-management", description: "We focus on water conservation and efficient management practices to ensure access to clean water and promote sustainable use for communities and agriculture." }
];

const ServicesSection = () => {
  const { data: dynamicServices } = useGetServicesQuery();
  const services = (dynamicServices && dynamicServices.length > 0) ? dynamicServices : defaultServices;

  return (
    <div className="causes-section pt-100 pb-70">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <span className="sub-title">Our Best Services</span>
            <h2> Jal Jeevan Mission</h2>
            <p>
              Our mission is to ensure safe and sustainable water access for every community.
              Through effective water management, awareness programs, and community participation,
              we work towards improving health, hygiene, and quality of life in rural and underserved areas.
            </p>
            <div className="custom-underline"></div>
          </div>
        </div>
        <div className="row g-2">
          {services.map((service, i) => (
            <div key={service._id || i} className="col-lg-3">
              <div className="causes-card">
                <img src={service.image || service.img} className="img-fluid" alt={service.title} />
                <div className="causes-body">
                  <h6>{service.title}</h6>
                  <p>{service.description || service.desc}</p>
                </div>
                <div className="causes-footer">
                  <a href={service.link}>Read More <i className="icofont-arrow-right"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
