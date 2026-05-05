import React from 'react';
import { useGetReportsQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';

const ReportsContent = () => {
  const { data: apiReports, isLoading } = useGetReportsQuery();

  const getFullUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/Annual-Progress-Reports')) return url; // Static fallback path
    return `${API_BASE_URL}${url}`;
  };

  const hardcodedReports = [
    { 
      year: '2025 - 2026', 
      label: 'Annual Progress Report -2025-26', 
      url: '/Annual-Progress-Reports/JPGGADF-APR-2025-26.pdf', 
      bg: 'bg-[#e63946]', 
      hoverBg: 'hover:bg-[#d62839]', 
      color: 'text-[#e63946]' 
    },
    { 
      year: '2024 - 2025', 
      label: 'Annual Progress Report -2024-25', 
      url: '/Annual-Progress-Reports/JPMRET-APR-2024-25.pdf', 
      bg: 'bg-[#28a745]', 
      hoverBg: 'hover:bg-[#218838]', 
      color: 'text-[#28a745]' 
    },
    { 
      year: '2023 - 2024', 
      label: 'Annual Progress Report -2023-24', 
      url: '/Annual-Progress-Reports/JPMRET-APR-2023-24.pdf', 
      bg: 'bg-[#007bff]', 
      hoverBg: 'hover:bg-[#0069d9]', 
      color: 'text-[#007bff]' 
    },
  ];

  const reports = apiReports && apiReports.length > 0 ? apiReports : hardcodedReports;

  // Helper to get color based on index for dynamic reports
  const getDynamicStyles = (index) => {
    const styles = [
      { bg: 'bg-[#e63946]', hoverBg: 'hover:bg-[#d62839]', color: 'text-[#e63946]' },
      { bg: 'bg-[#28a745]', hoverBg: 'hover:bg-[#218838]', color: 'text-[#28a745]' },
      { bg: 'bg-[#007bff]', hoverBg: 'hover:bg-[#0069d9]', color: 'text-[#007bff]' },
      { bg: 'bg-[#bd9143]', hoverBg: 'hover:bg-[#a67d35]', color: 'text-[#bd9143]' },
    ];
    return styles[index % styles.length];
  };

  if (isLoading) return <div className="py-20 text-center">Loading reports...</div>;

  return (
    <section className="reports-area py-[70px] lg:py-[100px] bg-white">
      <div className="container mx-auto px-[15px]">
        <div className="text-center mb-[40px]">
          <h2 className="text-[32px] lg:text-[40px] font-serif text-[#013b6d] font-bold mb-[10px]">
            Annual Progress Reports
          </h2>
          <p className="text-[#666] text-[16px]">
            Explore our yearly growth and achievements
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center -mx-[15px]">
          {reports.map((r, i) => {
            const style = r.bg ? r : getDynamicStyles(i);
            return (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-[15px] mb-[30px]">
                <div className="bg-white rounded-[10px] p-[35px] text-center border-[1px] border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between items-center transition-transform hover:-translate-y-1">
                  <div className="w-full flex flex-col items-center">
                    <i className={`fa-solid fa-file-lines text-[45px] ${style.color} mb-[20px]`}></i>
                    <h5 className="text-[20px] font-bold text-[#013b6d] mb-[10px]">{r.year}</h5>
                    <p className="text-[#666] text-[15px] mb-[25px] line-clamp-2">{r.label}</p>
                  </div>
                  <div>
                    <a 
                      href={getFullUrl(r.url)} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`inline-block text-white px-[20px] py-[8px] rounded-[5px] text-[14px] font-medium transition-colors duration-300 ${style.bg} ${style.hoverBg}`}
                    >
                      View Report
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReportsContent;
