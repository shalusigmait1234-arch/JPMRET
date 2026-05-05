import React from 'react';

const OurPresenceSection = () => {
  return (
    <section className="presence-section pt-100">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="presence-title">Our Presence</h2>
          </div>
        </div>
        <div className="row g-4 align-items-center mt-3">
          <div className="col-lg-5">
            <div className="presence-content">
              <p>
                Our foundation is actively working across key districts of
                <strong> Uttar Pradesh and Bihar</strong>, reaching thousands of
                underprivileged communities through impactful development programs.
              </p>
              <p>
                With a strong presence in cities like <strong>Lucknow (Corporate Office)</strong>,
                Maharajganj, Gorakhpur, Prayagraj, Varanasi region, and extending into Bihar,
                we focus on education, healthcare, livelihood, and social awareness initiatives.
              </p>
              <p>
                Through local participation and sustainable strategies, we aim to create
                long-lasting positive change in rural and semi-urban areas.
              </p>
            </div>
          </div>
          <div className="col-lg-7 text-center">
            <div className="presence-map">
              <img src="/assets/img/aboutus/map.jpg" className="img-fluid" alt="U.P. Map" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPresenceSection;
