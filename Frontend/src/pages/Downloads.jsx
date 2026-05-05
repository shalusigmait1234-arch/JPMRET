import React from 'react';

import PageTitle from '../components/PageTitle';

const Downloads = () => {
  const docs = [
    { name: "Organisation's Profile", icon: "fas fa-building", color: "text-blue-600", path: "/PDF/Orgn-Profile.pdf" },
    { name: "Code of Conduct", icon: "fas fa-scale-balanced", color: "text-green-600", path: "/PDF/Code-of-Conduct.pdf" },
    { name: "HR Policy / Manual", icon: "fas fa-users", color: "text-red-600", path: "/PDF/HR-Manual.pdf" },
    { name: "Financial & Accounting Manual", icon: "fas fa-file-invoice-dollar", color: "text-orange-600", path: "/PDF/Financial-Policy.pdf" },
    { name: "Gender Policy", icon: "fas fa-venus-mars", color: "text-pink-600", path: "#" },
    { name: "Conflict of Interest Policy", icon: "fas fa-handshake", color: "text-indigo-600", path: "/PDF/Conflict-of-Interes-Policy.pdf" }
  ];

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Downloads' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageTitle title="Downloads" breadcrumbs={breadcrumbs} />

      <section className="py-20">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001e38] mb-4 font-['DM_Serif_Display',serif]">Documents & Policies</h2>
            <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-6"></div>
            <p className="text-[#45443F] text-lg max-w-2xl mx-auto">
              Access and download our official organizational documents and policies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {docs.map((doc, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center">
                <div className={`w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 ${doc.color}`}>
                  <i className={doc.icon}></i>
                </div>
                <h6 className="font-bold text-[#001e38] mb-8">{doc.name}</h6>
                <div className="mt-auto w-full">
                  <a 
                    href={doc.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#001e38] text-[#001e38] px-6 py-2.5 rounded-md font-bold group-hover:bg-[#001e38] group-hover:text-white transition-all duration-300"
                  >
                    <i className="fas fa-download"></i> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
