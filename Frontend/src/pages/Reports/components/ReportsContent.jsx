import React from 'react';
import { useGetReportsQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';

const ReportsContent = () => {
  const { data: apiReports, isLoading } = useGetReportsQuery();

  const getFullUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/Annual-Progress-Reports')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const reports = apiReports || [];

  const getDynamicStyles = (index) => {
    const styles = [
      { accent: 'border-red-500', iconColor: 'text-red-500', btnBg: 'bg-red-500 hover:bg-red-600' },
      { accent: 'border-green-500', iconColor: 'text-green-500', btnBg: 'bg-green-500 hover:bg-green-600' },
      { accent: 'border-blue-500', iconColor: 'text-blue-500', btnBg: 'bg-blue-500 hover:bg-blue-600' },
      { accent: 'border-orange-500', iconColor: 'text-orange-500', btnBg: 'bg-orange-500 hover:bg-orange-600' },
    ];
    return styles[index % styles.length];
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Annual Progress Reports
          </h2>
          <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-6"></div>
          <p className="text-[#45443F] text-lg max-w-2xl mx-auto">
            Transparency is at the heart of our work. Explore our journey, impact, and growth through our yearly progress reports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((r, i) => {
            const style = r.accent ? r : getDynamicStyles(i);
            return (
              <div key={i} className={`group bg-white rounded-2xl p-10 text-center border-t-4 ${style.accent} shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col items-center h-full`}>
                <div className={`w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <i className={`fa-solid fa-file-pdf text-4xl ${style.iconColor}`}></i>
                </div>
                <h5 className="mb-3">{r.year}</h5>
                <p className="text-[#45443F] mb-8 font-medium leading-relaxed">
                  {r.label}
                </p>
                <div className="mt-auto">
                  <a 
                    href={getFullUrl(r.url)} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 text-white px-8 py-3 rounded-md font-bold transition-all duration-300 shadow-md hover:shadow-lg ${style.btnBg}`}
                  >
                    View Report <i className="icofont-download text-lg"></i>
                  </a>
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
