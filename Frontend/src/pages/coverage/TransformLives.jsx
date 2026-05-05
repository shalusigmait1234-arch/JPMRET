import React from 'react';
import PageTitle from '../../components/PageTitle';
import { useGetCoverageQuery } from '../../store/api/contentApi';
import { API_BASE_URL } from '../../config';

const TransformLives = () => {
  const { data: coverage, isLoading } = useGetCoverageQuery('transform-lives');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Coverage', path: '#' },
    { label: 'Transform Lives', path: '/coverage/transform-lives' }
  ];

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

  if (isLoading) return <div className="pt-100 pb-100 text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen pb-12">
      <PageTitle title={data.title} breadcrumbs={breadcrumbs} />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="row items-start mb-10">
            <div className="col-lg-7">
              <div className="pr-lg-5">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#003060] mb-6">
                  {data.title}
                </h1>
                <div className="space-y-6 text-[#444] text-lg leading-relaxed">
                  {data.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-5 mt-8 mt-lg-0">
              <div className="relative">
                <img 
                  src={getImageUrl(data.image)} 
                  alt={data.title} 
                  className="rounded-lg shadow-lg w-full object-cover"
                />
              </div>
            </div>
          </div>

          {data.features && data.features.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#003060] mb-8">
                Key Features:
              </h2>
              <div className="row">
                <div className="col-md-6">
                  {data.features.slice(0, Math.ceil(data.features.length / 2)).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#BD9143" />
                          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#444] text-lg leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="col-md-6">
                  {data.features.slice(Math.ceil(data.features.length / 2)).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#BD9143" />
                          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#444] text-lg leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TransformLives;
