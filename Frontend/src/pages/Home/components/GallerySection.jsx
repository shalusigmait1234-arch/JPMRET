import React from 'react';
import { useGetGalleryQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';

const GallerySection = () => {
  const { data: apiImages, isLoading } = useGetGalleryQuery();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const hardcodedImages = [
    { image: '/assets/img/gallery/pink/1.jpeg' },
    { image: '/assets/img/gallery/pink/2.jpeg' },
    { image: '/assets/img/gallery/pink/3.jpeg' },
    { image: '/assets/img/gallery/pink/4.jpeg' },
    { image: '/assets/img/gallery/pink/5.jpeg' },
    { image: '/assets/img/gallery/pink/6.jpeg' },
    { image: '/assets/img/gallery/pink/7.jpeg' },
    { image: '/assets/img/gallery/pink/8.jpeg' }
  ];

  const displayImages = apiImages && apiImages.length > 0 ? apiImages.slice(0, 8) : hardcodedImages;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#bd9143] text-xl font-medium uppercase tracking-widest mb-4 block">Our Gallery</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#001e38] mb-6 font-['DM_Serif_Display',serif]">Discover the best things we do</h2>
          <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-8"></div>
          <p className="text-[#45443F] max-w-3xl mx-auto text-lg leading-relaxed">
            We exist to support non-profits, social enterprises, community groups, activists, and individuals dedicated to creating positive change in society.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {displayImages.map((item, i) => {
              const imgUrl = getImageUrl(item.image);
              return (
                <div key={i} className="group relative overflow-hidden rounded-xl aspect-square shadow-md">
                  <img 
                    src={imgUrl} 
                    alt="Gallery Item" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <a 
                    href={imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-[#001e38]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  >
                    <div className="w-12 h-12 bg-[#bd9143] rounded-full flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <i className="icofont-plus text-xl"></i>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
