import React from 'react';

const ContactInfo = () => {
  const contactDetails = [
    {
      title: "Reg. Office",
      icon: "icofont-location-pin",
      content: "Lohiya Nagar, Dist. Maharajganj-273303 Uttar Pradesh (India)",
      link: "#"
    },
    {
      title: "Corporate Office",
      icon: "icofont-location-pin",
      content: "3/132, Vishesh Khand, Gomti Nagar, Lucknow -226010 Uttar Pradesh (India)",
      link: "#"
    },
    {
      title: "Phone",
      icon: "icofont-ui-call",
      content: ["+91-5224049534", "+91-9935820377"],
      links: ["tel:+915224049534", "tel:+919935820377"]
    },
    {
      title: "Email",
      icon: "icofont-ui-email",
      content: ["info@jpmret.com", "jptrust2010@gmail.com"],
      links: ["mailto:info@jpmret.com", "mailto:jptrust2010@gmail.com"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((detail, index) => (
            <div key={index} className="group p-8 bg-gray-50 rounded-2xl hover:bg-[#001e38] hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white text-[#bd9143] rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-[#bd9143] group-hover:text-white transition-all duration-500 shadow-md">
                <i className={detail.icon}></i>
              </div>
              <h4 className="text-lg font-bold text-[#001e38] group-hover:text-white mb-4 transition-colors uppercase tracking-wider">
                {detail.title}
              </h4>
              <div className="text-[#45443F] group-hover:text-gray-300 text-sm leading-relaxed transition-colors font-medium">
                {Array.isArray(detail.content) ? (
                  detail.content.map((item, i) => (
                    <a key={i} href={detail.links[i]} className="block hover:text-[#bd9143] transition-colors">{item}</a>
                  ))
                ) : (
                  <a href={detail.link} className="block hover:text-[#bd9143] transition-colors">{detail.content}</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
