import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  useGetGalleryListQuery,
  useCreateGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
  useUploadImageMutation
} from '../../../store/api/adminApi';
import { API_BASE_URL } from '../../../config';
import Pagination from '../../../components/Pagination';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Image as ImageIcon,
  Upload,
  X,
  ArrowUpDown,
  Tag,
  Search
} from 'lucide-react';

const GalleryManagement = () => {
  const { data: galleryItems, isLoading } = useGetGalleryListQuery();
  const [createGalleryImage, { isLoading: creating }] = useCreateGalleryImageMutation();
  const [updateGalleryImage, { isLoading: updating }] = useUpdateGalleryImageMutation();
  const [deleteGalleryImage] = useDeleteGalleryImageMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    image: '',
    caption: '',
    category: 'General',
    order: 0
  });
  
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('blob:')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const resetForm = () => {
    setFormData({ image: '', caption: '', category: 'General', order: 0 });
    setEditingId(null);
    setIsModalOpen(false);
    
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    setPreviewImage(URL.createObjectURL(file));

    const uploadData = new FormData();
    uploadData.append('folder', 'gallery');
    uploadData.append('image', file);

    try {
      const response = await uploadImage(uploadData).unwrap();
      const imageUrl = response.url || response.imageUrl;
      
      setFormData(prev => ({ ...prev, image: imageUrl }));
      
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image.');
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (item) => {
    setFormData({
      image: item.image,
      caption: item.caption || '',
      category: item.category || 'General',
      order: item.order || 0
    });
    setEditingId(item._id);
    setPreviewImage(getImageUrl(item.image));
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image from the gallery?')) {
      try {
        await deleteGalleryImage(id).unwrap();
        toast.success('Image deleted successfully!');
        if (editingId === id) resetForm();
      } catch {
        toast.error('Failed to delete image.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please upload an image.');
      return;
    }

    try {
      if (editingId) {
        await updateGalleryImage({ id: editingId, ...formData }).unwrap();
        toast.success('Gallery updated successfully!');
      } else {
        await createGalleryImage(formData).unwrap();
        toast.success('Image added to gallery!');
        resetForm();
      }
    } catch {
      toast.error('Failed to save gallery item.');
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  const saving = creating || updating || uploading;

  // Filter based on search
  const filteredGallery = galleryItems?.filter(item => 
    (item.caption || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGallery.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
              Gallery Management
            </h3>
            <p className="text-sm text-black font-medium uppercase tracking-widest">
              Manage your photo archives and event highlights
            </p>
          </div>
          <span className="bg-[#001e38] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            Total: {galleryItems?.length || 0}
          </span>
        </div>
        {!isModalOpen && (
          <div className="flex items-center space-x-4 flex-nowrap">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-black" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest placeholder:text-black/40 focus:outline-none focus:border-[#bd9143] transition-all min-w-[250px] shadow-sm"
              />
            </div>
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all text-xs font-bold uppercase tracking-widest shadow-md active:scale-95"
            >
              <Plus size={16} />
              <span>Add New Image</span>
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-black text-[#013b6d] uppercase tracking-widest">
                {editingId ? 'Edit Image' : 'Add New Image'}
              </h3>
              <button 
                onClick={() => { resetForm(); setIsModalOpen(false); }} 
                className="text-black hover:text-red-600 transition-colors bg-white rounded-full p-2 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Gallery Image</label>
                </div>
                
                <div className="relative group rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#bd9143] transition-all text-center">
                  {previewImage ? (
                    <div className="relative aspect-video w-full">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all transform hover:scale-110"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                      {uploading ? (
                        <RefreshCw className="h-8 w-8 text-[#bd9143] animate-spin mb-3" />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400 mb-3 group-hover:text-[#bd9143] transition-colors" />
                      )}
                      <span className="text-sm font-bold text-black">
                        {uploading ? 'Uploading...' : 'Click to Upload Image'}
                      </span>
                      <span className="text-xs text-black mt-1 font-bold">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Category</label>
                </div>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. General, Education, Events"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpDown size={14} className="text-[#bd9143]" />
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Order</label>
                  </div>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving || !formData.image}
                className={`w-full flex items-center justify-center space-x-3 py-2 px-6 rounded-lg hover: transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${saving ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'}`}
                >
                  <Save size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    {saving ? 'Submitting...' : editingId ? 'Update Image' : 'Save Image'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* Grid Display */}
      <div className="w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
              <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em]">Image Grid</h4>
              <span className="text-xs font-bold bg-white border border-gray-200 text-black px-3 py-1 rounded-full shadow-sm">
                {galleryItems?.length || 0} Images
              </span>
            </div>
            
            {galleryItems && galleryItems.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentItems.map((item) => (
                    <div 
                      key={item._id} 
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all flex flex-col ${editingId === item._id ? 'border-[#bd9143] shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="relative aspect-square w-full bg-gray-50">
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.caption || 'Gallery image'} 
                          className="w-full h-full object-cover"
                        />
                        {item.order > 0 && (
                          <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            #{item.order}
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-black uppercase tracking-widest bg-white border border-gray-100 px-2 py-1 rounded truncate max-w-[80px] shadow-sm">
                          {item.category}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Save size={14} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination Component */}
                <Pagination 
                  currentPage={currentPage}
                  totalItems={filteredGallery.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <p className="text-xs font-bold uppercase tracking-widest">No images in gallery</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default GalleryManagement;
