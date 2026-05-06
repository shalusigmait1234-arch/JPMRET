import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ title, breadcrumbs }) => {
  return (
    <div 
      className="relative py-16 md:py-20 bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/assets/img/banner/bredcrumb.jpg')" }}
    >
      <div className="max-w-[1170px] mx-auto px-4 text-center">
        <h1 className="font-serif text-[32px] md:text-[36px] leading-tight font-normal text-white mb-3">{title}</h1>
        <nav className="flex justify-center items-center gap-3 text-white text-[16px] font-semibold">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index === breadcrumbs.length - 1 ? (
                <span>{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.path} className="hover:text-[#d3a047] transition-colors">{crumb.label}</Link>
                  <span className="text-[#d3a047] text-xs font-bold">▪</span>
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
