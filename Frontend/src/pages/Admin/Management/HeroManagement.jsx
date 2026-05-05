import React, { useState, useEffect } from 'react';
import {
  useUpdateHeroMutation,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetHeroesQuery,
  useUploadImageMutation
} from '../../../store/api/adminApi';
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
  Link2
} from 'lucide-react';
import { API_BASE_URL } from '../../../config';

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
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploadStatus, setUploadStatus] = useState('');

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
    setMessage({ type: '', text: '' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hero section?')) {
      try {
        await deleteHero(id).unwrap();
        setMessage({ type: 'success', text: 'Hero section deleted successfully!' });
        if (editingId === id) resetForm();
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete hero section.' });
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
      // Store ONLY the filename in the DB as requested
      const filename = response.filename || response.url.split('/').pop();
      setFormData({ ...formData, image: filename });
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(''), 2000);
    } catch (err) {
      setUploadStatus('error');
      setMessage({ type: 'error', text: 'Image upload failed. Please try again.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      if (editingId) {
        await updateHero({ id: editingId, ...formData }).unwrap();
        setMessage({ type: 'success', text: 'Hero section updated successfully!' });
      } else {
        await createHero(formData).unwrap();
        setMessage({ type: 'success', text: 'Hero section created successfully!' });
        resetForm();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err?.data?.message || 'Failed to save hero section.' });
    }
  };

  if (fetchLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end">
        {/* <div>
          <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">Hero Section Management</h3>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">Control the main banners of your website</p>
        </div> */}
        {editingId && (
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Plus size={14} />
            <span>Add New Instead</span>
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg text-sm flex items-center ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                    <div className="flex flex-col items-center justify-center pt-2 pb-3">
                      {uploadStatus === 'uploading' ? (
                        <div className="animate-spin h-6 w-6 border-b-2 border-[#bd9143]"></div>
                      ) : uploadStatus === 'success' ? (
                        <Check className="h-6 w-6 text-green-500" />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-400 group-hover:text-[#bd9143] transition-colors" />
                      )}
                      <p className="mt-2 text-xs  text-gray-500 uppercase tracking-widest">
                        {uploadStatus === 'uploading' ? 'Uploading...' : 'Click to Upload Image'}
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
              className="w-full flex items-center justify-center space-x-3 py-2.5 px-6 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              <Save size={18} />
              <span className="text-sm uppercase tracking-widest">
                {updateLoading || createLoading ? 'Saving...' : editingId ? 'Update Hero Section' : 'Create Hero Section'}
              </span>
            </button>
          </form>
        </div>

        {/* Preview Column */}
        {/* <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Live Preview</h4>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 shadow-2xl group">
              {formData.image ? (
                <img
                  src={getImageUrl(formData.image)}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000'; }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-[10px] uppercase tracking-widest">
                  No Image Selected
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                <h1 className="text-2xl text-black font-['DM_Serif_Display',serif] leading-tight">
                  {formData.title || 'Your Title Here'}
                </h1>
                <p className="text-base text-gray-900 font-medium line-clamp-2 leading-relaxed">
                  {formData.subtitle || 'Your hero section description will appear here.'}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-2 bg-[#bd9143] text-white text-xs uppercase tracking-widest rounded shadow-lg">
                    {formData.buttonText || 'Explore More'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50">
              <h5 className="text-[10px] font-black text-[#bd9143] uppercase tracking-[0.2em] mb-2 flex items-center">
                <ExternalLink size={12} className="mr-2" /> Quick Tip
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                The preview above shows how this banner will look on the homepage.
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Existing Hero Banners</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-4 px-4 text-xs uppercase tracking-widest">Preview</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest">Content</th>
                  {/* <th className="py-4 px-4 text-xs uppercase tracking-widest"></th> */}
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {heroes && heroes.length > 0 ? (
                  heroes.map((hero) => (
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
                      {/* <td className="py-4 px-4">
                        <span className="text-xs text-gray-400 font-medium">{hero.createdAt ? new Date(hero.createdAt).toLocaleDateString() : '—'}</span>
                      </td> */}
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
                            {/* <span>Edit</span> */}
                          </button>
                          <button
                            onClick={() => handleDelete(hero._id)}
                            className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                          >
                            <Trash2 size={12} />
                            {/* <span>Delete</span> */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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
        </div>

        {/* <div className="bg-[#bd9143]/10 p-6 rounded-xl border border-[#bd9143]/20">
            <h5 className="text-[10px] font-black text-[#bd9143] uppercase tracking-[0.2em] mb-2 flex items-center">
              <ExternalLink size={12} className="mr-2" /> Note
            </h5>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              The list shows all your hero banners. You can edit any banner by clicking the Edit button or remove it using the Delete button.
            </p>
          </div> */}
      </div>
    </div>
  );
};

export default HeroManagement;
