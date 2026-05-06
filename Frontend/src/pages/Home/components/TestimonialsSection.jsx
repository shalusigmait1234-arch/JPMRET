import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetTestimonialsQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';

const TestimonialsSection = () => {
  const { data: apiTestimonials, isLoading } = useGetTestimonialsQuery();

  const displayTestimonials = apiTestimonials || [];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-16">
          {/* <span className="text-[#bd9143] text-xl font-medium uppercase tracking-widest mb-4 block">What People Say</span> */}
          <h2 className="mb-6">Voices of Impact</h2>
          <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-8"></div>
          <p className="text-[#45443F] max-w-2xl mx-auto text-lg">Voices from communities where we have made a difference.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={displayTestimonials.length > 2}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 }
            }}
            className="testimonial-swiper !pb-14"
          >
            {displayTestimonials.map((test, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-10 rounded-2xl relative shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 group text-center h-full">
                  <div className="absolute top-8 right-8 text-4xl text-[#bd9143]/10 group-hover:text-[#bd9143]/20 transition-colors">
                    <i className="fa-solid fa-quote-right"></i>
                  </div>

                  <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#bd9143]/20 shadow-md">
                    <img
                      src={getImageUrl(test.img)}
                      alt={test.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-[#45443F] italic leading-relaxed text-lg mb-8 min-h-[120px]">
                    "{test.text}"
                  </p>

                  <div className="mt-auto">
                    <h5 className="text-2xl mb-1">{test.name}</h5>
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-[0.2em]">{test.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .testimonial-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #001e38;
          opacity: 0.2;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #bd9143;
          opacity: 1;
          width: 25px;
          border-radius: 5px;
        }
      `}} />
    </section>
  );
};

export default TestimonialsSection;
