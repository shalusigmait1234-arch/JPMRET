import React from 'react';
import PageTitle from '../../components/PageTitle';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import { API_BASE_URL } from '../../config';

const WaterManagement = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('water-management');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Coverage', path: '#' },
    { label: 'Water Management', path: '/coverage/water-management' }
  ];

  const defaultData = {
    title: "Water Management",
    image: "/assets/img/work/cause-4.jpg",
    description: [
      "Our Water Management Service is dedicated to ensuring efficient use, conservation, and sustainable management of water resources in rural and urban communities. Water is a vital resource for agriculture, daily living, and ecosystem balance, and our mission is to promote practices that secure its availability for present and future generations.",
      "We focus on developing community-based water solutions that improve access to clean water, enhance irrigation efficiency, and reduce water wastage. Our initiatives include rainwater harvesting systems, watershed development, groundwater recharge projects, and improved irrigation techniques to support farmers and households."
    ],
    features: [
      "Rainwater harvesting system installation and promotion",
      "Watershed development and soil moisture conservation",
      "Efficient irrigation systems (drip and sprinkler methods)",
      "Groundwater recharge and management solutions",
      "Safe drinking water access and quality monitoring",
      "Community awareness and water conservation training",
      "Sustainable water resource planning and management",
      "Farmer support for water-efficient agriculture"
    ]
  };

  const data = coverage || defaultData;

  if (isLoading) return <div className="pt-100 pb-100 text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen pb-12">
      <PageTitle title={data.title} breadcrumbs={breadcrumbs} />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="row items-start mb-10">
            <div className="col-lg-7">
              <div className="pr-lg-5">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#003060] mb-6">
                  {data.title}
                </h1>
                <div className="space-y-6 text-[#444] text-lg leading-relaxed">
                  {data.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-5 mt-8 mt-lg-0">
              <div className="relative">
                <img 
                  src={getImageUrl(data.image)} 
                  alt={data.title} 
                  className="rounded-lg shadow-lg w-full object-cover"
                />
              </div>
            </div>
          </div>

          {data.features && data.features.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#003060] mb-8">
                Key Features:
              </h2>
              <div className="row">
                <div className="col-md-6">
                  {data.features.slice(0, Math.ceil(data.features.length / 2)).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#BD9143" />
                          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#444] text-lg leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="col-md-6">
                  {data.features.slice(Math.ceil(data.features.length / 2)).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#BD9143" />
                          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#444] text-lg leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WaterManagement;
