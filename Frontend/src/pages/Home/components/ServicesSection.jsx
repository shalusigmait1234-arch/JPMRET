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
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#bd9143] text-xl font-medium uppercase tracking-widest mb-4 block">Our Best Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Jal Jeevan Mission</h2>
          <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-8"></div>
          <p className="text-[#45443F] max-w-3xl mx-auto text-lg leading-relaxed">
            Our mission is to ensure safe and sustainable water access for every community.
            Through effective water management, awareness programs, and community participation,
            we work towards improving health, hygiene, and quality of life in rural and underserved areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div key={service._id || i} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image || service.img} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={service.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h6 className="text-lg font-bold text-[#001e38] mb-3 group-hover:text-[#bd9143] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {service.title}
                </h6>
                <p className="text-sm text-[#45443F] leading-relaxed line-clamp-3 mb-6">
                  {service.description || service.desc}
                </p>
                <div className="mt-auto">
                  <a 
                    href={service.link}
                    className="inline-flex items-center gap-2 text-[#001e38] font-bold text-sm group-hover:text-[#bd9143] transition-colors"
                  >
                    Read More <i className="icofont-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
