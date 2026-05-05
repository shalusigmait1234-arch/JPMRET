import React from 'react';
import PageTitle from '../components/PageTitle';
import { useGetPrintMediaQuery } from '../store/api/contentApi';
import { API_BASE_URL } from '../config';

const PrintMedia = () => {
  const { data: apiMedia, isLoading } = useGetPrintMediaQuery();

  const getFullUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/PDF')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Print Media' }
  ];

  const hardcodedMedia = [
    { title: "Organization Profile", url: "/PDF/Orgn-Profile.pdf" },
    { title: "Financial Policy", url: "/PDF/Financial-Policy.pdf" }
  ];

  const mediaList = apiMedia && apiMedia.length > 0 ? apiMedia : hardcodedMedia;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageTitle title="Print Media" breadcrumbs={breadcrumbs} />
      
      <div className="max-w-[1170px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {mediaList.map((item, index) => (
            <div key={index} className="group bg-white p-10 md:p-12 rounded-2xl border-t-4 border-[#bd9143] shadow-md hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center h-full">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <i className="fa-solid fa-file-pdf text-4xl text-red-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#001e38] mb-8 font-['DM_Serif_Display',serif]">{item.title}</h3>
              <div className="mt-auto w-full">
                <a 
                  href={getFullUrl(item.url)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#001e38] text-white px-8 py-3 rounded-md font-bold hover:bg-[#bd9143] transition-all duration-300 shadow-md"
                >
                  View Document <i className="icofont-download text-lg"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintMedia;
