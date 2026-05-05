import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ title, breadcrumbs }) => {
  return (
    <div 
      className="relative py-20 md:py-32 bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0,30,56,0.8), rgba(0,30,56,0.8)), url('/assets/img/banner/banner-main1.jpg')" }}
    >
      <div className="max-w-[1170px] mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['DM_Serif_Display',serif]">{title}</h1>
        <nav className="flex justify-center items-center gap-2 text-white/80 text-sm md:text-base">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-[#bd9143]">{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.path} className="hover:text-[#bd9143] transition-colors">{crumb.label}</Link>
                  <span className="text-[#bd9143] font-bold">/</span>
                </>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PageTitle;
