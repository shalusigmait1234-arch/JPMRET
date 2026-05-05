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
  const { data: dynamicHero, isLoading } = useGetHeroQuery();

  const defaultSlides = [
    {
      title: "Transforming Lives One<br /> School at a Time",
      desc: "Our educational initiatives aim to provide quality learning<br> and better opportunities for every child.",
      img: "/assets/img/banner/banner-1.jpg",
      link: "/about"
    },
    {
      title: "Empowering Communities<br /> Through Agriculture",
      desc: "Janki Prasad Memorial Research Educational Trust supports<br> agricultural development for a stronger and self-reliant future.",
      img: "/assets/img/banner/banner-2.jpg",
      link: "/contact"
    },
    {
      title: "Saving Water,<br /> Securing Future",
      desc: "We promote efficient water use and conservation<br> to secure resources for future generations.",
      img: "/assets/img/banner/banner-4.jpg",
      link: "/about"
    }
  ];

  // If dynamic data is available and is an array with items, use it. Otherwise use defaults.
  const slides = (dynamicHero && Array.isArray(dynamicHero) && dynamicHero.length > 0) 
    ? dynamicHero.map(hero => ({
        title: hero.title,
        desc: hero.subtitle,
        img: hero.image,
        link: hero.buttonLink,
        btnText: hero.buttonText
      }))
    : (dynamicHero && !Array.isArray(dynamicHero)) // Fallback for single object
      ? [{
          title: dynamicHero.title,
          desc: dynamicHero.subtitle,
          img: dynamicHero.image,
          link: dynamicHero.buttonLink,
          btnText: dynamicHero.buttonText
        }]
      : defaultSlides;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    return `${API_BASE_URL}/uploads/${imagePath}`;
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

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
              className="relative min-h-[500px] md:min-h-[650px] lg:min-h-[800px] flex items-center bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(rgba(0,30,56,0.7), rgba(0,30,56,0.7)), url(${getImageUrl(slide.img)})` }}
            >
              <div className="max-w-[1170px] mx-auto px-4 w-full">
                <div className="max-w-3xl">
                  <h1 
                    className="text-white text-3xl md:text-5xl lg:text-6xl font-bold font-['DM_Serif_Display',serif] mb-6 leading-tight drop-shadow-lg"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  ></h1>
                  <p 
                    className="text-white text-lg md:text-xl mb-10 leading-relaxed opacity-90 drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: slide.desc }}
                  ></p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={slide.link}
                      className="bg-white text-[#001e38] px-8 py-3 rounded-md font-semibold hover:bg-[#bd9143] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-lg"
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
      
      {/* Custom Slider Navigation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255,255,255,0.1);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: #bd9143 !important;
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
      `}} />
    </div>
  );
};

export default HeroSection;
