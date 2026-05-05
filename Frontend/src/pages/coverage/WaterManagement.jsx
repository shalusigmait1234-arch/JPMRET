import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import CoverageDetail from './CoverageDetail';

const WaterManagement = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('water-management');

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

  return <CoverageDetail data={data} />;
};

export default WaterManagement;
