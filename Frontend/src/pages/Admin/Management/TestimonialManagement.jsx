import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  useGetTestimonialsListQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useUploadImageMutation
} from '../../../store/api/adminApi';
import { API_BASE_URL } from '../../../config';
import Pagination from '../../../components/Pagination';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  User,
  Briefcase,
  Quote,
  Image as ImageIcon,
  Upload,
  X,
  ArrowUpDown,
  Eye,
  Pencil
} from 'lucide-react';

const TestimonialManagement = () => {
  const { data: testimonials, isLoading } = useGetTestimonialsListQuery();
  const [createTestimonial, { isLoading: creating }] = useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: updating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    img: '',
    order: 0
  });

  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('blob:')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', text: '', img: '', order: 0 });
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
    uploadData.append('image', file);
    uploadData.append('folder', 'testimonials');

    try {
      const response = await uploadImage(uploadData).unwrap();
      const imageUrl = response.url || response.imageUrl;
      setFormData(prev => ({ ...prev, img: imageUrl }));
      toast.success('Image uploaded successfully.');
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image.');
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, img: '' }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      role: item.role,
      text: item.text,
      img: item.img,
      order: item.order || 0
    });
    setEditingId(item._id);
    setPreviewImage(getImageUrl(item.img));
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id).unwrap();
        toast.success('Testimonial deleted successfully!');
        if (editingId === id) resetForm();
      } catch {
        toast.error('Failed to delete testimonial.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.img) {
      toast.error('Please upload a photo.');
      return;
    }

    try {
      if (editingId) {
        await updateTestimonial({ id: editingId, ...formData }).unwrap();
        toast.success('Testimonial updated successfully!');
      } else {
        await createTestimonial(formData).unwrap();
        toast.success('Testimonial added successfully!');
        resetForm();
      }
    } catch {
      toast.error('Failed to save testimonial.');
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  const saving = creating || updating || uploading;

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testimonials?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all text-xs font-bold uppercase tracking-widest shadow-md active:scale-95"
        >
          <Plus size={16} />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-black text-[#013b6d] uppercase tracking-widest">
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button
                onClick={() => { resetForm(); setIsModalOpen(false); }}
                className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Side */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <ImageIcon size={14} className="text-[#bd9143]" />
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Photo</label>
                      </div>

                      <div className="relative group rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#bd9143] transition-all text-center h-40">
                        {previewImage ? (
                          <div className="relative h-full w-full">
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={removeImage}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-full cursor-pointer p-4">
                            {uploading ? (
                              <RefreshCw className="h-8 w-8 text-[#bd9143] animate-spin mb-2" />
                            ) : (
                              <Upload className="h-8 w-8 text-gray-400 group-hover:text-[#bd9143] mb-2" />
                            )}
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                              {uploading ? 'Uploading...' : 'Upload Photo'}
                            </span>
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

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-[#bd9143]" />
                          <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Name</label>
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                          placeholder="e.g. Mohini"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-[#bd9143]" />
                          <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Role</label>
                        </div>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                          placeholder="e.g. Farmer"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Quote size={14} className="text-[#bd9143]" />
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Message</label>
                      </div>
                      <textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all resize-none"
                        placeholder="Testimonial message..."
                        rows="4"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown size={14} className="text-[#bd9143]" />
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Display Order</label>
                      </div>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className={`w-full flex items-center justify-center space-x-3 py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${saving ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'}`}
                  >
                    <Save size={18} />
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {saving ? 'Submitting...' : editingId ? 'Update Testimonial' : 'Save Testimonial'}
                    </span>
                  </button>
                </form>

                {/* Preview Side */}
                <div className="hidden lg:block space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye size={14} className="text-[#bd9143]" />
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Live Preview</label>
                  </div>
                  
                  <div className="bg-[#f8f9fa] p-8 rounded-2xl flex items-center justify-center min-h-[400px] border border-gray-100">
                    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-sm text-center transform transition-transform hover:scale-[1.02] duration-300">
                      <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#bd9143]/20 shadow-inner">
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                            <User size={40} />
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 italic text-base leading-relaxed mb-8 min-h-[100px]">
                        "{formData.text || 'Testimonial text will appear here...'}"
                      </p>
                      
                      <div className="space-y-1">
                        <h4 className="text-xl font-bold text-[#001e38] font-['DM_Serif_Display',serif]">
                          {formData.name || 'Name'}
                        </h4>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                          {formData.role || 'Role'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Existing Testimonials</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Person</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Message</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {testimonials && testimonials.length > 0 ? (
                <>
                  {currentItems.map((item) => (
                    <tr key={item._id} className={`group hover:bg-gray-50/50 transition-all ${editingId === item._id ? 'bg-[#bd9143]/5' : ''}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                            <img src={getImageUrl(item.img)} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-sm font-bold text-[#001e38] truncate">{item.name}</h5>
                            <p className="text-[10px] font-medium text-[#bd9143] uppercase tracking-widest">{item.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-xs text-gray-500 line-clamp-2 italic">"{item.text}"</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{item.order}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className={`p-2 rounded-lg transition-all ${editingId === item._id ? 'bg-[#bd9143] text-white' : 'bg-gray-100 text-[#001e38] hover:bg-[#001e38] hover:text-white'}`}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <Quote size={40} className="text-gray-100 mb-4" />
                      <p className="text-xs font-black text-gray-300 uppercase tracking-widest">No testimonials found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Component */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <Pagination 
            currentPage={currentPage}
            totalItems={testimonials?.length || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialManagement;

