import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ title, breadcrumbs }) => {
  return (
    <div className="page-title-area title-bg-one">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="title-item">
              <h2>{title}</h2>
              <ul>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index}>
                    {index === breadcrumbs.length - 1 ? (
                      <span>{crumb.label}</span>
                    ) : (
                      <Link to={crumb.path}>{crumb.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
