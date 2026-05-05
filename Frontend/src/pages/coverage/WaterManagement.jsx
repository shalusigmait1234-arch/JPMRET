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
    { label: 'Water Management' }
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

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageTitle title={data.title} breadcrumbs={breadcrumbs} />

      <section className="py-20">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div className="w-full lg:w-7/12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif] leading-tight">
                {data.title}
              </h2>
              <div className="w-16 h-[2px] bg-[#f06f14] mb-8"></div>
              
              <div className="space-y-6 text-[#45443F] text-lg leading-relaxed font-medium mb-12">
                {data.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {data.features && data.features.length > 0 && (
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Key Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {data.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 rounded-full bg-[#bd9143]/10 flex items-center justify-center mt-1 group-hover:bg-[#bd9143] transition-colors">
                          <i className="fa-solid fa-check text-[#bd9143] text-xs group-hover:text-white transition-colors"></i>
                        </div>
                        <span className="text-[#45443F] font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-5/12 sticky top-24">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors -z-10"></div>
                <img 
                  src={getImageUrl(data.image)} 
                  className="w-full h-auto rounded-lg shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                  alt={data.title} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterManagement;
