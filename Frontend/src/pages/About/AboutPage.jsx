import PageTitle from '../../components/PageTitle';
import AboutContent from './components/AboutContent';

const AboutPage = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'About Us' }
  ];

  return (
    <div className="about-page">
      <PageTitle title="About Us" breadcrumbs={breadcrumbs} />
      <AboutContent />
    </div>
  );
};

export default AboutPage;
