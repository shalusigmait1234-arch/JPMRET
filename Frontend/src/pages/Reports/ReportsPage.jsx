import React from 'react';
import PageTitle from '../../components/PageTitle';
import ReportsContent from './components/ReportsContent';

const ReportsPage = () => {
  return (
    <div className="reports-page">
      <PageTitle 
        title="Reports" 
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Reports' }]} 
      />
      <ReportsContent />
    </div>
  );
};

export default ReportsPage;
