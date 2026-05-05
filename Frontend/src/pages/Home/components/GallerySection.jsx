import React from 'react';
import { useGetGalleryQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';

const GallerySection = () => {
  const { data: apiImages, isLoading } = useGetGalleryQuery();

  // Helper to format image URL correctly
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
    <section className="gallery-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Our gallery</span>
          <h2>Discover the best things we do</h2>
          <p>We exist to support non-profits, social enterprises, community groups, activists, and individuals dedicated to creating positive change in society.</p>
          <div className="custom-underline"></div>
        </div>
        <div className="row g-4">
          {isLoading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-[#bd9143]" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            displayImages.map((item, i) => {
              const imgUrl = getImageUrl(item.image);
              return (
                <div key={i} className="col-sm-6 col-lg-3 col-6">
                  <div className="gallery-item h-100">
                    <a href={imgUrl} data-lightbox="roadtrip" className="h-100 d-block">
                      <img src={imgUrl} alt="Gallery" className="w-100 h-100 object-cover" style={{ aspectRatio: '1/1' }} />
                      <i className="icofont-plus"></i>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
