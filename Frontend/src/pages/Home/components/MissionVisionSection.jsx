import React from 'react';

const MissionVisionSection = () => {
  return (
    <section className="mv-section pt-100 pb-70">
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="mv-card">
              <div className="mv-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h4>Mission</h4>
              <p>
                To build self-reliant communities through participation, awareness, and inclusive development while empowering marginalized groups, especially women and rural populations.
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="mv-card">
              <div className="mv-icon">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h4>Vision</h4>
              <p>
                To empower underprivileged communities and integrate them into national development through strong people's organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
