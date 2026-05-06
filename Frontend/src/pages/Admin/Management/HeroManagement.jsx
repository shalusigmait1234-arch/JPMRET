import React, { useState, useEffect } from 'react';
import {
  useUpdateHeroMutation,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetHeroesQuery,
  useUploadImageMutation
} from '../../../store/api/adminApi';
import Pagination from '../../../components/Pagination';
import {
  Save,
  Image as ImageIcon,   // ← add alias here
  Upload,               // ← now a separate import
  Check,
  Trash2,
  Edit2,
  Plus,
  RefreshCw,
  MousePointer2,
  Link2,
  X
} from 'lucide-react';
import { API_BASE_URL } from '../../../config';
import { toast } from 'react-toastify';

const HeroManagement = () => {
  const { data: heroes, isLoading: fetchLoading, refetch } = useGetHeroesQuery();
  const [createHero, { isLoading: createLoading }] = useCreateHeroMutation();
  const [updateHero, { isLoading: updateLoading }] = useUpdateHeroMutation();
  const [deleteHero] = useDeleteHeroMutation();
  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    buttonText: '',
    buttonLink: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Use a helper to get full image URL. For production, this should use window.location.origin or an env var
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    return `${API_BASE_URL}/uploads/${imagePath}`;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      buttonText: '',
      buttonLink: ''
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (hero) => {
    setFormData({
      title: hero.title || '',
      subtitle: hero.subtitle || '',
      image: hero.image || '',
      buttonText: hero.buttonText || '',
      buttonLink: hero.buttonLink || ''
    });
    setEditingId(hero._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hero section?')) {
      try {
        await deleteHero(id).unwrap();
        toast.success('Hero section deleted successfully!');
        if (editingId === id) resetForm();
      } catch (err) {
        toast.error('Failed to delete hero section.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploadStatus('uploading');
      const response = await uploadImage(data).unwrap();
      // Store the full URL from Cloudinary
      setFormData({ ...formData, image: response.url });
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(''), 2000);
    } catch (err) {
      setUploadStatus('error');
      toast.error('Image upload failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateHero({ id: editingId, ...formData }).unwrap();
        toast.success('Hero section updated successfully!');
        resetForm();
      } else {
        await createHero(formData).unwrap();
        toast.success('Hero section created successfully!');
        resetForm();
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save hero section.');
    }
  };

  if (fetchLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = heroes?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end">
        {/* Title removed per your UI */}
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all text-xs font-bold uppercase tracking-widest shadow-md"
        >
          <Plus size={14} />
          <span>Create Hero Section</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-black text-[#013b6d] uppercase tracking-widest">
                {editingId ? 'Edit Hero Section' : 'Create Hero Section'}
              </h3>
              <button 
                onClick={() => { resetForm(); setIsModalOpen(false); }} 
                className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Type size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm text-gray-900 uppercase tracking-widest">Main Title</label>
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter hero title"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <AlignLeft size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm text-gray-900 uppercase tracking-widest">Subtitle / Description</label>
                </div>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  rows="1"
                  className="w-full resize-none"
                  placeholder="Enter hero description"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                {/* <ImageIcon size={14} className="text-[#bd9143]" /> */}
                <label className="text-sm text-gray-900 uppercase tracking-widest">Background Image</label>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="w-full flex flex-col items-center justify-center p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 hover:border-[#bd9143]/50 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-2 pb-3 w-full">
                      {formData.image && uploadStatus !== 'uploading' ? (
                        <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden border-2 border-white shadow-md">
                          <img 
                            src={getImageUrl(formData.image)} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <Upload className="text-white h-6 w-6" />
                          </div>
                        </div>
                      ) : uploadStatus === 'uploading' ? (
                        <div className="animate-spin h-8 w-8 border-b-2 border-[#bd9143] mb-2"></div>
                      ) : uploadStatus === 'success' ? (
                        <Check className="h-8 w-8 text-green-500 mb-2" />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400 group-hover:text-[#bd9143] transition-colors mb-2" />
                      )}
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                        {uploadStatus === 'uploading' ? 'Uploading...' : formData.image ? 'Click to Change Image' : 'Upload Background Image'}
                      </p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full font-mono"
                  placeholder="Image URL will appear here"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <MousePointer2 size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm text-gray-900 uppercase tracking-widest">Button Text</label>
                </div>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Link2 size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm text-gray-900 uppercase tracking-widest">Button Link</label>
                </div>
                <input
                  type="text"
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updateLoading || createLoading || uploadStatus === 'uploading'}
              className={`w-full flex items-center justify-center space-x-3 py-2.5 px-6 rounded-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${
                updateLoading || createLoading
                  ? 'bg-black text-white'
                  : 'bg-[#001e38] text-white hover:bg-[#bd9143]'
              }`}
            >
              <Save size={18} />
              <span className="text-sm uppercase tracking-widest">
                {updateLoading || createLoading ? 'Submitting...' : editingId ? 'Update Hero Section' : 'Create Hero Section'}
              </span>
            </button>
          </form>
          </div>
        </div>
      </div>
      )}

      <div className="pt-8 border-t border-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Existing Hero Banners</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-4 px-4 text-xs uppercase tracking-widest">Preview</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest">Content</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {heroes && heroes.length > 0 ? (
                  <>
                    {currentItems.map((hero) => (
                      <tr
                        key={hero._id}
                        className={`group transition-all hover:bg-gray-50/50 ${editingId === hero._id ? 'bg-[#bd9143]/5' : ''
                          }`}
                      >
                        <td className="py-4 px-4">
                          <div className="w-24 aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={getImageUrl(hero.image)}
                              alt={hero.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000'; }}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-md">
                          <h5 className="text-base text-[#013b6d] truncate">{hero.title}</h5>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-1">{hero.subtitle}</p>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(hero)}
                              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-widest ${editingId === hero._id
                                ? 'bg-[#bd9143] text-white'
                                : 'bg-gray-100 text-[#013b6d] hover:bg-[#013b6d] hover:text-white'
                                }`}
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(hero._id)}
                              className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <p className="text-xs  text-gray-400 uppercase tracking-widest">No hero banners found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
        
        {/* Pagination Component */}
        <div className="p-4 border-t border-gray-50">
          <Pagination 
            currentPage={currentPage}
            totalItems={heroes?.length || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default HeroManagement;
