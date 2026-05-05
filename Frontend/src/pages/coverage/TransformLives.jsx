import React from 'react';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import CoverageDetail from './CoverageDetail';

const TransformLives = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('transform-lives');

  const defaultData = {
    title: "Transform lives",
    image: "/assets/img/work/cause-3.jpg",
    description: [
      "\"Transform Lives One School at a Time\" reflects our commitment to creating lasting social impact through quality education. We believe that every school is a foundation for shaping the future, and by strengthening educational systems at the grassroots level, we can empower entire communities. Our approach focuses on improving learning environments, enhancing teaching quality, and ensuring equal access to education for all children, especially in underserved and rural areas.",
      "We work to bridge gaps in education by supporting infrastructure development, providing learning resources, and promoting innovative teaching methods. By engaging teachers, parents, and local communities."
    ],
    features: [
      "School infrastructure improvement and development support",
      "Teacher training and capacity-building programs",
      "Digital learning and smart classroom initiatives",
      "Student skill development and learning enhancement",
      "Community engagement and parental awareness programs",
      "Educational material and resource support",
      "Focus on rural and underprivileged schools",
      "Enrollment drive and dropout reduction programs"
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

export default TransformLives;
