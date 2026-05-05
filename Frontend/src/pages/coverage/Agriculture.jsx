import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import { API_BASE_URL } from '../../config';

import PageTitle from '../../components/PageTitle';

const Agriculture = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('agriculture');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const defaultData = {
    title: "Agriculture Development",
    image: "/assets/img/work/cause-1.jpg",
    description: [
      "Our Agriculture Development Service is dedicated to empowering farmers and strengthening rural livelihoods through sustainable, modern, and result-oriented agricultural practices. We aim to enhance productivity, improve income levels, and promote environmentally responsible farming techniques that ensure long-term food security and rural prosperity.",
      "We provide end-to-end support including soil health assessment, crop planning, irrigation management, and access to high-quality seeds and fertilizers. Our experts guide farmers in adopting advanced farming methods such as organic farming, drip irrigation, integrated pest management, and precision agriculture."
    ],
    features: []
  };

  const data = coverage || defaultData;

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: data.title }
  ];

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
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-7/12 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif] leading-tight">
                {data.title}
              </h2>
              <div className="w-16 h-[2px] bg-[#f06f14] mb-8"></div>
              
              <div className="space-y-6 text-[#45443F] text-lg leading-relaxed font-medium">
                {data.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 order-1 lg:order-2">
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

export default Agriculture;
