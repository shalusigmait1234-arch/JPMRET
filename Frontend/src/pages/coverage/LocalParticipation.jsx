import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import CoverageDetail from './CoverageDetail';

const LocalParticipation = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('local-participation');

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

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }

  return <CoverageDetail data={data} />;
};

export default LocalParticipation;
