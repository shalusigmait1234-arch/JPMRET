import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import { API_BASE_URL } from '../../config';

import PageTitle from '../../components/PageTitle';

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

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: data.title }
  ];

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageTitle title={data.title} breadcrumbs={breadcrumbs} />

      <section className="py-20">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div className="w-full lg:w-7/12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif] leading-tight">
                {data.title}
              </h2>
              <div className="w-16 h-[2px] bg-[#f06f14] mb-8"></div>
              
              <div className="space-y-6 text-[#45443F] text-lg leading-relaxed font-medium mb-12">
                {data.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {data.features && data.features.length > 0 && (
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Key Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {data.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 rounded-full bg-[#bd9143]/10 flex items-center justify-center mt-1 group-hover:bg-[#bd9143] transition-colors">
                          <i className="fa-solid fa-check text-[#bd9143] text-xs group-hover:text-white transition-colors"></i>
                        </div>
                        <span className="text-[#45443F] font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-5/12 sticky top-24">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors -z-10"></div>
                <img 
                  src={getImageUrl(data.image)} 
                  className="w-full h-auto rounded-lg shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                  alt={data.title} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalParticipation;
