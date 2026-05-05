import React from 'react';

const AboutSection = () => {
  return (
    <section className="cta-layout3 pt-0">
      <div className="container">
        <div className="about-section pt-100">
          <div className="row text-center">
            <div className="col-lg-12">
              <h2 className="title mb-3">Welcome to Janki Prasad Global Governance and Development Foundation</h2>
              <div className="underline"></div>
              <div className="about-right">
                <p>
                  The JP Global Governance And Development Foundation (JPGGADF), an ISO 9001:2015 certified
                  organization, was established in 2010 with the vision of uplifting the poor and marginalized 
                  by promoting people's organizations as a cornerstone for achieving a self-reliant community
                  and contributing to national progress.
                </p>
                <div className="about-img mb-4">
                  <img src="/assets/img/aboutus/aboutus.jpg" className="img-fluid" alt="About Us" />
                </div>
                <p>
                  The Board of Trustees of the JPGGADF is a distinguished group of individuals who brought
                  together a wealth of experience, knowledge and a commitment to advancing education and
                  social development. Among them are academicians, retired Vice Chancellor and visionaries
                  with a deep appreciation for traditional culture.
                </p>
                <div className="about-btn-area">
                  <a className="common-btn" href="/about">
                    Read More <i className="icofont-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
