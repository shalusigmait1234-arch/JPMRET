import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import { API_BASE_URL } from '../../config';

const LocalParticipation = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('local-participation');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const defaultData = {
    title: "Local Participation",
    image: "/assets/img/work/cause-2.jpg",
    description: [
      "Local participation is a vital pillar of sustainable agriculture development. It ensures that farming communities are actively involved in planning, decision-making, and implementation of agricultural initiatives. By engaging local farmers, self-help groups, and village institutions, development programs become more practical, inclusive, and effective in addressing real field-level challenges.",
      "Through active participation, farmers share their traditional knowledge and local insights, which helps in designing better crop strategies suited to regional soil, climate, and water conditions. It also encourages ownership, accountability, and long-term commitment toward agricultural improvement."
    ],
    features: [
      "Community-driven planning and decision-making",
      "Formation and strengthening of local groups and committees",
      "Awareness campaigns and participatory workshops",
      "Capacity building and leadership development programs",
      "Inclusion of women and marginalized groups",
      "Knowledge sharing and local skill enhancement",
      "Collaboration with village institutions and stakeholders",
      "Monitoring and feedback through community engagement"
    ]
  };

  const data = coverage || defaultData;

  if (isLoading) return <div className="pt-100 pb-100 text-center">Loading...</div>;

  return (
    <div className="local-participation-page">
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
            
            {data.features && data.features.length > 0 && (
              <div className="col-12 mt-5">
                <h3>Key Features:</h3>
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <ul className="service_list list-none p-0">
                      {data.features.slice(0, Math.ceil(data.features.length / 2)).map((feature, i) => (
                        <li key={i} className="mb-3 flex items-start gap-2">
                          <i className="fa-solid fa-circle-check text-[#bd9143] mt-1"></i> 
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="service_list list-none p-0">
                      {data.features.slice(Math.ceil(data.features.length / 2)).map((feature, i) => (
                        <li key={i} className="mb-3 flex items-start gap-2">
                          <i className="fa-solid fa-circle-check text-[#bd9143] mt-1"></i> 
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalParticipation;
