import React from 'react';
import { useGetStatsQuery } from '../../../store/api/contentApi';

const defaultStats = [
  { label: "Projects completed", value: "300", target: "+" },
  { label: "Communities supported", value: "250", target: "+" },
  { label: "Volunteers engaged", value: "550", target: "+" },
  { label: "Beneficiaries reached", value: "500", target: "+" }
];

const StatsSection = () => {
  const { data: dynamicStats } = useGetStatsQuery();
  const stats = (dynamicStats && dynamicStats.length > 0) ? dynamicStats : defaultStats;

  return (
    <div className="bg-[#001e38] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat._id || i} className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-4">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                  {stat.value}
                </h3>
                <span className="text-3xl md:text-5xl font-light text-[#bd9143]">
                  {stat.target}
                </span>
              </div>
              <p className="text-gray-300 font-semibold uppercase text-xs md:text-sm tracking-widest">
                {stat.label}
              </p>
              <div className="w-10 h-[1px] bg-[#bd9143] mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
