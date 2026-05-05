import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetTestimonialsQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';

const TestimonialsSection = () => {
  const { data: apiTestimonials, isLoading } = useGetTestimonialsQuery();

  const hardcodedTestimonials = [
    {
      name: "Mohini",
      role: "Farmer",
      img: "/assets/img/aboutus/test-1.jpg",
      text: "Janki Prasad Memorial Research Educational Trust is implementing a program called “education” in partnership with Guru Krupa Foundation to bridge the digital literacy gap among students in rural India."
    },
    {
      name: "Ashraf Raja",
      role: "Teacher",
      img: "/assets/img/aboutus/test-2.jpg",
      text: "Ms. Sushmita Khandagle, an eighth-grade student at Zila Parishad Higher Primary School in a small village called Shirodi in Auragnabad district, Maharashtra."
    }
  ];

  const displayTestimonials = apiTestimonials && apiTestimonials.length > 0 ? apiTestimonials : hardcodedTestimonials;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  return (
    <div className="testimonial-area pt-100 pb-100">
      <div className="container">
        <div className="text-center">
          <h2 className="test-section-title">What People Say</h2>
          <p className="test-title">Voices from communities we have impacted</p>
          <div className="custom-underline"></div>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 30 }
          }}
          className="testimonial-slider mt-5"
        >
          {isLoading ? (
            <SwiperSlide>
              <div className="text-center py-5">
                <div className="spinner-border text-[#bd9143]" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </SwiperSlide>
          ) : (
            displayTestimonials.map((test, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <div className="testimonial-img">
                      <img src={getImageUrl(test.img)} alt={test.name} />
                    </div>
                    <p>{test.text}</p>
                    <h5>{test.name}</h5>
                    <span>{test.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsSection;
