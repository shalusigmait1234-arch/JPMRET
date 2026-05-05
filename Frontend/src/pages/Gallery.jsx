import React from 'react';
import { useGetGalleryQuery } from '../store/api/contentApi';
import { API_BASE_URL } from '../config';

const Gallery = () => {
  const { data: apiImages, isLoading } = useGetGalleryQuery();
  const images = [
    // Pink Folder
    ...Array.from({ length: 15 }, (_, i) => `/assets/img/gallery/pink/${i + 1}.jpeg`),
    // Yellow Folder
    ...Array.from({ length: 14 }, (_, i) => `/assets/img/gallery/yellow/${i + 1}.jpeg`)
  ];

  // Helper to format image URL correctly (handle local uploads vs external links)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath; // Local hardcoded images
    return `${API_BASE_URL}${imagePath}`;
  };

  const displayImages = apiImages && apiImages.length > 0 ? apiImages : images;

  return (
    <div className="gallery-page">
      <div className="page-title-area title-bg-one">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="title-item">
                <h2>Gallery</h2>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><span>Gallery</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="gallery-area pb-5 pt-100">
        <div className="container">
          <div className="row g-4">
            {isLoading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-[#bd9143]" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              displayImages.map((img, i) => {
                // Handle both hardcoded string array and object array from API
                const imgUrl = typeof img === 'string' ? img : getImageUrl(img.image);
                
                return (
                  <div key={i} className="col-xl-3 col-sm-6 col-lg-4 col-6">
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
    </div>
  );
};

export default Gallery;
