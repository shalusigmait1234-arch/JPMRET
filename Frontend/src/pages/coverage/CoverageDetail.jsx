import React from 'react';
import { Check } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/assets')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};

const CoverageDetail = ({ data }) => {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-7 pb-16 md:pb-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.85fr] gap-8 lg:gap-12 items-start">
            <div>
              <h1 className="font-serif text-[32px] leading-tight font-bold text-[#00436a] mb-5">
                {data.title}
              </h1>

              <div className="space-y-5 text-[#111827] text-[17px] leading-8 font-normal">
                {data.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="w-full">
              <img
                src={getImageUrl(data.image)}
                className="w-full h-[308px] object-cover rounded-md"
                alt={data.title}
              />
            </div>
          </div>

          {data.features && data.features.length > 0 && (
            <div className="mt-7">
              <h2 className="font-serif text-[30px] leading-tight font-bold text-[#00436a] mb-3">
                Key Features:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-3">
                {data.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#111827] text-[16px] leading-6">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#d0a24d] text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoverageDetail;
