import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useUpsertCoverageMutation, useUploadImageMutation } from '../../../store/api/adminApi';
import { useGetCoverageQuery } from '../../../store/api/contentApi';
import { API_BASE_URL } from '../../../config';
import {
  Save,
  RefreshCw,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  FileText,
  List
} from 'lucide-react';

const CoverageManagement = ({ sectionSlug }) => {
  const location = useLocation();
  // If slug is not passed as prop, try to get it from path
  const slug = sectionSlug || location.pathname.split('/').pop();

  const { data: coverageData, isLoading: fetching, refetch } = useGetCoverageQuery(slug);
  const [upsertCoverage, { isLoading: saving }] = useUpsertCoverageMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: [''],
    features: ['']
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (coverageData) {
      setFormData({
        title: coverageData.title || '',
        image: coverageData.image || '',
        description: coverageData.description && coverageData.description.length > 0 ? coverageData.description : [''],
        features: coverageData.features && coverageData.features.length > 0 ? coverageData.features : ['']
      });
      setPreviewImage(getImageUrl(coverageData.image));
    }
  }, [coverageData]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('blob:')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const uploadData = new FormData();
    uploadData.append('image', file);
    uploadData.append('folder', 'coverage');

    try {
      const response = await uploadImage(uploadData).unwrap();
      const imageUrl = response.url || response.imageUrl;
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast.success('Image uploaded successfully.');
    } catch (err) {
      toast.error('Failed to upload image.');
      setPreviewImage(null);
    }
  };

  // Generic handlers for arrays (description, features)
  const handleArrayChange = (index, value, field) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr.length > 0 ? newArr : [''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await upsertCoverage({ slug, ...formData }).unwrap();
      toast.success('Content updated successfully!');
      refetch();
    } catch {
      toast.error('Failed to save content.');
    }
  };

  if (fetching) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        {/* <div>
          <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
            {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h3>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
            Manage page content and features
          </p>
        </div> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-5 flex items-center gap-2">
                <FileText size={14} /> Page Text Content
              </h4>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Page Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                    placeholder="e.g. Agriculture Development"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Description Paragraphs</label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('description')}
                      className="text-[10px] font-bold text-[#bd9143] uppercase hover:underline flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Paragraph
                    </button>
                  </div>
                  {formData.description.map((para, idx) => (
                    <div key={idx} className="relative group">
                      <textarea
                        value={para}
                        onChange={(e) => handleArrayChange(idx, e.target.value, 'description')}
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                        rows="4"
                        placeholder={`Paragraph ${idx + 1}...`}
                        required
                      />
                      {formData.description.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(idx, 'description')}
                          className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-5 flex items-center gap-2">
                <List size={14} /> Key Features / Highlights
              </h4>

              <div className="space-y-3">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange(idx, e.target.value, 'features')}
                      className="flex-1 p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                      placeholder={`Feature point ${idx + 1}...`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(idx, 'features')}
                      className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('features')}
                  className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-[#bd9143] hover:text-[#bd9143] transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add Feature Point
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar / Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-5">
                Feature Image
              </h4>

              <div className="space-y-4">
                <div className="relative group rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#bd9143] transition-all text-center">
                  {previewImage ? (
                    <div className="relative aspect-[4/3] w-full">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="bg-white text-[#001e38] p-2 rounded-full cursor-pointer hover:bg-[#bd9143] hover:text-white transition-all transform hover:scale-110">
                          <Upload size={20} />
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center py-20 cursor-pointer">
                      {uploading ? (
                        <RefreshCw className="h-10 w-10 text-[#bd9143] animate-spin mb-3" />
                      ) : (
                        <Upload className="h-10 w-10 text-gray-300 mb-3 group-hover:text-[#bd9143] transition-colors" />
                      )}
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {uploading ? 'Uploading...' : 'Click to Upload Image'}
                      </span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={uploading} />
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className={`w-full flex items-center justify-center space-x-3 py-2.5 px-6 rounded-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${
                    saving || uploading ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'
                  }`}
                >
                  {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                  <span className="text-sm font-bold uppercase tracking-widest">
                    {saving || uploading ? 'Submitting...' : 'Update Page Content'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CoverageManagement;
