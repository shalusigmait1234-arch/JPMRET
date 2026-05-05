import React from 'react';
import PageTitle from '../components/PageTitle';
import { useGetPrintMediaQuery } from '../store/api/contentApi';
import { API_BASE_URL } from '../config';

const PrintMedia = () => {
  const { data: apiMedia, isLoading } = useGetPrintMediaQuery();

  const getFullUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/PDF')) return url; // Static fallback path
    return `${API_BASE_URL}${url}`;
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Print Media', path: '/print-media' }
  ];

  const hardcodedMedia = [
    { title: "Print Media 1", url: "/PDF/Orgn-Profile.pdf" },
    { title: "Print Media 2", url: "/PDF/Financial-Policy.pdf" }
  ];

  const mediaList = apiMedia && apiMedia.length > 0 ? apiMedia : hardcodedMedia;

  if (isLoading) return <div className="py-20 text-center">Loading media...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      <PageTitle title="Print Media" breadcrumbs={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center -mx-4">
          {mediaList.map((item, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-5/12 px-4 mb-8">
              <div className="bg-white p-10 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-md transition-all text-center h-full flex flex-col items-center">
                <div className="mb-6">
                  <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4V44H38V16L26 4H10Z" fill="#E33E43"/>
                    <path d="M26 4V16H38L26 4Z" fill="#B72E32"/>
                    <text x="14" y="34" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">PDF</text>
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#003060] mb-8">{item.title}</h3>
                <div className="mt-auto">
                  <a 
                    href={getFullUrl(item.url)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[#E33E43] text-white px-10 py-3 rounded-full font-bold hover:bg-[#c12e32] transition-colors"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintMedia;
