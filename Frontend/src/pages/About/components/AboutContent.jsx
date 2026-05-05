import React from 'react';

const AboutContent = () => {
  return (
    <section className="cta-layout3 presence-section pb-5 pt-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h2 className="title mb-3">Welcome to Janki Prasad Global Governance and Development Foundation</h2>
            <div className="underline"></div>
            <div className="about-right">
              <p>
                The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified
                organization, was established in 2010 with the vision of uplifting the poor and marginalized 
                by promoting people's organizations as a cornerstone for achieving a self-reliant community
                and contributing to national progress.
              </p>
              <p>
                The Board of Trustees of the JPGGADF is a distinguished group of individuals who brought
                together a wealth of experience, knowledge and a commitment to advancing education and
                social development. Among them are academicians, retired Vice Chancellor and visionaries
                with a deep appreciation for traditional culture.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-img mb-4">
              <img src="/assets/img/aboutus/about2.png" className="img-fluid mobimg" alt="About Us" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
