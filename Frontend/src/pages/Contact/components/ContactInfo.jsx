import React from 'react';
import { AtSign, MapPin, Phone } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      title: "Reg. Office",
      Icon: MapPin,
      content: "Lohiya Nagar, Dist. Maharajganj-273303 Uttar Pradesh (India)",
      link: "#"
    },
    {
      title: "Corporate Office",
      Icon: MapPin,
      content: "3/132, Vishesh Khand, Gomti Nagar, Lucknow -226010 Uttar Pradesh (India)",
      link: "#"
    },
    {
      title: "Phone",
      Icon: Phone,
      content: ["+91-5224049534", "+91-9935820377"],
      links: ["tel:+915224049534", "tel:+919935820377"]
    },
    {
      title: "Email",
      Icon: AtSign,
      content: ["info@jpmret.com", "jptrust2010@gmail.com"],
      links: ["mailto:info@jpmret.com", "mailto:jptrust2010@gmail.com"]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="min-h-[210px] rounded-lg border border-[#d3a047] bg-white px-7 py-5 text-center flex flex-col items-center justify-center">
              <div className="text-[#d3a047] mb-4">
                <detail.Icon size={40} strokeWidth={2} fill={detail.title === 'Email' ? 'none' : 'currentColor'} aria-hidden="true" />
              </div>
              <h4 className="mb-2 tracking-normal">
                {detail.title}:
              </h4>
              <div className="text-[#09073f] text-[16px] leading-6 font-medium">
                {Array.isArray(detail.content) ? (
                  detail.content.map((item, i) => (
                    <a key={i} href={detail.links[i]} className="block hover:text-[#d3a047] transition-colors">{item}</a>
                  ))
                ) : (
                  <a href={detail.link} className="block hover:text-[#d3a047] transition-colors">{detail.content}</a>
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
