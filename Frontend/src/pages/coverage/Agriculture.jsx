import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import { API_BASE_URL } from '../../config';

const Agriculture = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('agriculture');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const defaultData = {
    title: "Agriculture Development",
    image: "/assets/img/work/cause-1.jpg",
    description: [
      "Our Agriculture Development Service is dedicated to empowering farmers and strengthening rural livelihoods through sustainable, modern, and result-oriented agricultural practices. We aim to enhance productivity, improve income levels, and promote environmentally responsible farming techniques that ensure long-term food security and rural prosperity.",
      "We provide end-to-end support including soil health assessment, crop planning, irrigation management, and access to high-quality seeds and fertilizers. Our experts guide farmers in adopting advanced farming methods such as organic farming, drip irrigation, integrated pest management, and precision agriculture."
    ],
    features: []
  };

  const data = coverage || defaultData;

  if (isLoading) return <div className="pt-100 pb-100 text-center">Loading...</div>;

  return (
    <div className="agriculture-page">
      <div className="page-title-area title-bg-one">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="title-item">
                <h2>{data.title}</h2>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><span>{data.title}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="cta-layout3 presence-section pb-5 pt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="title mb-3">{data.title}</h2>
              <div className="underline"></div>
              <div className="about-right">
                {data.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-img mb-4">
                <img src={getImageUrl(data.image)} className="rounded-lg shadow-lg w-full object-cover mobimg" alt={data.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agriculture;
