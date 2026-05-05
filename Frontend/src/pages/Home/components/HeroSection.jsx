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
    <div className="banner-area-two three">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={slides.length > 1}
        className="banner-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="banner-slider-item" style={{ backgroundImage: `url(${getImageUrl(slide.img)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="banner-content">
                      <h1 
                        className="font-['DM_Serif_Display',serif]"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      ></h1>
                      <p dangerouslySetInnerHTML={{ __html: slide.desc }}></p>
                      <div className="banner-btn-area">
                        <a className="banner-btn" href={slide.link}>
                          {slide.btnText || 'Explore More'} <i className="icofont-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
