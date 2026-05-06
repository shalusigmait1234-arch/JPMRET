import React from 'react';
import { useGetServicesQuery } from '../../../store/api/contentApi';

const defaultServices = [
  {
    title: "Agriculture development",
    image: "/assets/img/work/cause-1.jpg",
    link: "/coverage/agriculture",
    description:
      "We promote sustainable farming practices and support farmers with knowledge and resources to improve productivity, increase income."
  },
  {
    title: "Local participation and sustainability",
    image: "/assets/img/work/cause-2.jpg",
    link: "/coverage/local-participation",
    description:
      "We encourage active community involvement to create sustainable solutions that are inclusive, long-lasting, and driven by local."
  },
  {
    title: "Transform lives one school at a time",
    image: "/assets/img/work/cause-3.jpg",
    link: "/coverage/transform-lives",
    description:
      "We work to improve education by supporting schools, enhancing learning environments, and creating opportunities."
  },
  {
    title: "Water management",
    image: "/assets/img/work/cause-4.jpg",
    link: "/coverage/water-management",
    description:
      "We focus on water conservation and efficient management practices to ensure access to clean water and promote sustainable use for communities and agriculture."
  }
];

const ServicesSection = () => {
  const { data: dynamicServices } = useGetServicesQuery();

  const services =
    dynamicServices && dynamicServices.length > 0
      ? dynamicServices
      : defaultServices;

  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/img/aboutus/Background.jpg')"
      }}
    >
      <div className="max-w-[1170px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Jal Jeevan Mission
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Our mission is to ensure safe and sustainable water access for every community.
            Through effective water management, awareness programs, and community participation,
            we work towards improving health, hygiene, and quality of life in rural and underserved areas.
          </p>

          <div className="w-20 h-[3px] bg-[#c89b3c] mx-auto mt-4"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={service._id || i}
              className="bg-[#f3f3f3] border border-gray-300 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="p-4 pb-0">
                <img
                  src={service.image || service.img}
                  alt={service.title}
                  className="w-full h-44 object-cover border"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-grow">
                <h5 className="mb-3 leading-snug min-h-[60px]">
                  {service.title}
                </h5>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description || service.desc}
                </p>
              </div>

              {/* Button */}
              <div className="px-5 pb-5 mt-auto">
                <a
                  href={service.link}
                  className="block w-full text-center bg-[#c89b3c] text-white py-3 font-semibold hover:bg-[#b1842f] transition"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;