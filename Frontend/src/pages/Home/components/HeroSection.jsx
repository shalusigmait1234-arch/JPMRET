import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useGetHeroQuery } from '../../../store/api/contentApi';
import { RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../../../config';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSection = () => {
  const { data: Hero, isLoading } = useGetHeroQuery();

  // ✅ fallback dummy slides (commented out as requested)
  /*
  const defaultSlides = [
    {
      title: "Welcome to Our Platform",
      desc: "Explore our services and solutions designed for you.",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      link: "#",
      btnText: "Get Started"
    },
    {
      title: "Build Something Amazing",
      desc: "We help you turn ideas into reality with modern tech.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      link: "#",
      btnText: "Learn More"
    }
  ];
  */

  // ✅ dynamic logic only
  const slides =
    (Hero && Array.isArray(Hero) && Hero.length > 0)
      ? Hero.map(hero => ({
        title: hero.title,
        desc: hero.subtitle,
        img: hero.image,
        link: hero.buttonLink,
        btnText: hero.buttonText
      }))
      : (Hero && !Array.isArray(Hero))
        ? [{
          title: Hero.title,
          desc: Hero.subtitle,
          img: Hero.image,
          link: Hero.buttonLink,
          btnText: Hero.buttonText
        }]
        : []; // No dummy fallback

  if (isLoading) {
    return (
      <div className="p-20 text-center">
        <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={slides.length > 1}
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] flex items-center bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%), url(${slide.img || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'
                  })`
              }}
            >
              <div className="max-w-[1170px] mx-auto px-4 w-full">
                <div className="max-w-3xl">
                  <h1
                    className="!text-white text-xl md:text-3xl lg:text-4xl font-['DM_Serif_Display',serif] mb-4 leading-tight drop-shadow-lg"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />

                  <p
                    className="text-white text-base md:text-lg mb-6 leading-relaxed opacity-90 drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: slide.desc }}
                  />

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={slide.link}
                      className="bg-[#bd9143] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-white hover:text-[#001e38] transition-all duration-300 flex items-center gap-2 shadow-lg"
                    >
                      {slide.btnText || 'Explore More'}
                      <i className="icofont-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ IMPROVED SIDE SCROLLER + PAGINATION */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ===== NAVIGATION ARROWS ===== */
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.5) !important;
          width: 36px !important;
          height: 36px !important;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.8) !important;
          transform: scale(1.05);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 10px !important;
          font-weight: 900 !important;
          -webkit-text-stroke: 1px white;
          line-height: 1;
        }

        .swiper-button-prev {
          left: 20px !important;
        }

        .swiper-button-next {
          right: 20px !important;
        }

        /* ===== PAGINATION ===== */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }

        .swiper-pagination-bullet-active {
          background: #bd9143 !important;
          opacity: 1;
          width: 22px;
          border-radius: 6px;
        }
        `
      }} />
    </div>
  );
};

export default HeroSection;