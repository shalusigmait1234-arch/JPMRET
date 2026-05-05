import React, { useState, useRef } from 'react';
import {
  useGetTestimonialsListQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useUploadImageMutation
} from '../../../store/api/adminApi';
import { API_BASE_URL } from '../../../config';
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
  ArrowUpDown
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
  const [message, setMessage] = useState({ type: '', text: '' });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('blob:')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', text: '', img: '', order: 0 });
    setEditingId(null);
    setMessage({ type: '', text: '' });
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
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
      setMessage({ type: 'success', text: 'Image uploaded successfully.' });
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage({ type: 'error', text: 'Failed to upload image.' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id).unwrap();
        setMessage({ type: 'success', text: 'Testimonial deleted successfully!' });
        if (editingId === id) resetForm();
      } catch {
        setMessage({ type: 'error', text: 'Failed to delete testimonial.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.img) {
      setMessage({ type: 'error', text: 'Please upload a photo.' });
      return;
    }

    try {
      if (editingId) {
        await updateTestimonial({ id: editingId, ...formData }).unwrap();
        setMessage({ type: 'success', text: 'Testimonial updated successfully!' });
      } else {
        await createTestimonial(formData).unwrap();
        setMessage({ type: 'success', text: 'Testimonial added successfully!' });
        resetForm();
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save testimonial.' });
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  const saving = creating || updating || uploading;

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-end">
        {/* <div>
          <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
            Testimonials
          </h3>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
            Manage what people say about us
          </p>
        </div> */}
        {editingId && (
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Plus size={14} />
            <span>Add New</span>
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-3 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-5">
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#bd9143]" />
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Photo</label>
                </div>

                <div className="relative group rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#bd9143] transition-all text-center h-32">
                  {previewImage ? (
                    <div className="relative h-full w-full">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                      {uploading ? (
                        <RefreshCw className="h-6 w-6 text-[#bd9143] animate-spin" />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-400 group-hover:text-[#bd9143]" />
                      )}
                      <span className="text-[10px] font-bold text-gray-600 mt-1 uppercase tracking-widest">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-[#bd9143]" />
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Name</label>
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                    placeholder="e.g. John Doe"
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
                    className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
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
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="Testimonial message..."
                  rows="3"
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
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center space-x-3 p-3 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                >
                  <Save size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Save'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-5">
              Manage Testimonials
            </h4>

            <div className="space-y-4">
              {testimonials && testimonials.length > 0 ? (
                testimonials.map((item) => (
                  <div key={item._id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={getImageUrl(item.img)} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm font-bold text-[#013b6d]">{item.name}</h5>
                          <p className="text-[10px] font-bold text-[#bd9143] uppercase tracking-widest">{item.role}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                          >
                            <Save size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 italic">"{item.text}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                  <Quote size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-bold uppercase tracking-widest">No testimonials found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialManagement;
