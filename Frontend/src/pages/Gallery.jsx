import { FaPlus } from 'react-icons/fa';
import PageTitle from '../components/PageTitle';
import { useGetGalleryQuery } from '../store/api/contentApi';
import { API_BASE_URL } from '../config';

const Gallery = () => {
  const { data: apiImages, isLoading } = useGetGalleryQuery();
  const hardcodedImages = [
    // Pink Folder
    ...Array.from({ length: 15 }, (_, i) => `/assets/img/gallery/pink/${i + 1}.jpeg`),
    // Yellow Folder
    ...Array.from({ length: 14 }, (_, i) => `/assets/img/gallery/yellow/${i + 1}.jpeg`)
  ];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/assets')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const displayImages = apiImages && apiImages.length > 0 ? apiImages : hardcodedImages;

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Gallery' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageTitle title="Gallery" breadcrumbs={breadcrumbs} />

      <section className="py-20">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Visual Journey</h2>
            <div className="w-16 h-[2px] bg-[#f06f14] mx-auto mb-6"></div>
            <p className="text-[#45443F] text-lg max-w-2xl mx-auto">
              A glimpse into our initiatives, community engagements, and the impact we've created together.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayImages.map((img, i) => {
                const imgUrl = typeof img === 'string' ? img : getImageUrl(img.image);
                
                return (
                  <div key={i} className="group relative overflow-hidden rounded-xl aspect-square shadow-md bg-gray-100">
                    <img 
                      src={imgUrl} 
                      alt="Gallery Item" 
                      className="block w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      loading="lazy"
                    />
                    <a 
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-[#001e38]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    >
                      <div className="w-12 h-12 bg-[#bd9143] rounded-full flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <FaPlus className="text-xl" />
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
