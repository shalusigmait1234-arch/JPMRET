import React from 'react';
import PageTitle from '../../components/PageTitle';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

const ContactPage = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact Us' }
  ];

  return (
    <>
      <PageTitle title="Contact Us" breadcrumbs={breadcrumbs} />
      <ContactInfo />
      <ContactForm />
    </>
  );
};

export default ContactPage;