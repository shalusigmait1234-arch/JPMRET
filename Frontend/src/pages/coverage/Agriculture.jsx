import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import CoverageDetail from './CoverageDetail';

const Agriculture = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('agriculture');

  const defaultData = {
    title: "Agriculture Development",
    image: "/assets/img/work/cause-1.jpg",
    description: [
      "Our Agriculture Development Service is dedicated to empowering farmers and strengthening rural livelihoods through sustainable, modern, and result-oriented agricultural practices. We aim to enhance productivity, improve income levels, and promote environmentally responsible farming techniques that ensure long-term food security and rural prosperity.",
      "We provide end-to-end support including soil health assessment, crop planning, irrigation management, and access to high-quality seeds and fertilizers. Our experts guide farmers in adopting advanced farming methods such as organic farming, drip irrigation, integrated pest management, and precision agriculture."
    ],
    features: [
      "Soil testing and crop suitability analysis",
      "Access to quality seeds and agricultural inputs",
      "Sustainable and organic farming practices",
      "Farmer training and capacity-building programs",
      "Modern irrigation solutions (drip & sprinkler systems)",
      "Market linkage and crop advisory services",
      "Pest and disease management support",
      "Use of technology for smart farming solutions"
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

  return <CoverageDetail data={data} />;
};

export default Agriculture;
