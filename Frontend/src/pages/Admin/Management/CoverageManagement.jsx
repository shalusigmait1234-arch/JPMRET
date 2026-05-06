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
  List,
  Layout,
  CheckCircle2
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
      <RefreshCw className="animate-spin h-10 w-10 text-[#bd9143] mx-auto" />
      <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading content...</p>
    </div>
  );

  const displaySlug = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layout className="text-[#bd9143]" size={20} />
            <span className="text-[10px] font-black text-[#bd9143] uppercase tracking-[0.3em]">Module / Coverage</span>
          </div>
          <h3 className="text-3xl font-bold text-[#001e38] font-serif tracking-tight">
            {displaySlug}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage page content, descriptions, and highlights for <span className="text-[#bd9143] font-bold">{displaySlug}</span>.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                type="button"
                onClick={() => refetch()}
                className="p-2.5 text-gray-400 hover:text-[#001e38] bg-white border border-gray-200 rounded-xl hover:border-[#001e38] transition-all shadow-sm"
                title="Refresh Data"
            >
                <RefreshCw size={20} />
            </button>
            <div className="h-10 w-[1px] bg-gray-200 hidden md:block mx-1"></div>
            <button
                form="coverage-form"
                type="submit"
                disabled={saving || uploading}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#001e38] text-white rounded-xl hover:bg-[#bd9143] transition-all shadow-lg shadow-blue-900/10 active:scale-95 disabled:opacity-50"
            >
                {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                <span className="text-sm font-bold uppercase tracking-widest">Save Changes</span>
            </button>
        </div>
      </div>

      <form id="coverage-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Description Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#001e38] group-hover:bg-[#bd9143] transition-colors"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-[#001e38] rounded-lg">
                        <FileText size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-[#001e38]">Main Content</h4>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    Page Heading Title
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd9143]/20 focus:border-[#bd9143] transition-all"
                    placeholder="Enter main page title..."
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description Paragraphs</label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('description')}
                      className="px-3 py-1.5 text-[11px] font-bold text-[#bd9143] bg-[#bd9143]/10 rounded-lg uppercase tracking-wider hover:bg-[#bd9143] hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Add Paragraph
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.description.map((para, idx) => (
                      <div key={idx} className="relative group/item">
                        <div className="absolute -left-4 top-4 w-1 h-0 bg-[#bd9143] group-hover/item:h-12 transition-all duration-300"></div>
                        <textarea
                          value={para}
                          onChange={(e) => handleArrayChange(idx, e.target.value, 'description')}
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#bd9143]/20 focus:border-[#bd9143] transition-all min-h-[120px] leading-relaxed"
                          placeholder={`Enter paragraph ${idx + 1}...`}
                          required
                        />
                        {formData.description.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem(idx, 'description')}
                            className="absolute top-3 right-3 p-2 bg-white text-red-500 border border-red-100 rounded-lg opacity-0 group-hover/item:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#001e38] group-hover:bg-[#bd9143] transition-colors"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-[#bd9143] rounded-lg">
                        <List size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-[#001e38]">Key Highlights</h4>
                </div>
                <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-[#bd9143] hover:text-[#bd9143] transition-all"
                >
                    <Plus size={14} /> Add Highlight
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2 group/feat">
                    <div className="relative flex-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bd9143]">
                            <CheckCircle2 size={16} />
                        </div>
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayChange(idx, e.target.value, 'features')}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd9143]/20 focus:border-[#bd9143] transition-all"
                          placeholder={`Highlight point ${idx + 1}...`}
                        />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem(idx, 'features')}
                      className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/feat:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Image */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <ImageIcon size={20} />
                </div>
                <h4 className="text-lg font-bold text-[#001e38]">Media Asset</h4>
              </div>

              <div className="space-y-6">
                <div className="relative group aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#bd9143] transition-all">
                  {previewImage ? (
                    <div className="relative h-full w-full">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#001e38]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                        <label className="bg-white text-[#001e38] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#bd9143] hover:text-white transition-all transform hover:scale-105 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                          <Upload size={16} />
                          Replace Image
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer p-6">
                      {uploading ? (
                        <RefreshCw className="h-10 w-10 text-[#bd9143] animate-spin mb-4" />
                      ) : (
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-gray-100 rounded-full mb-4 group-hover:bg-[#bd9143]/10 transition-colors">
                                <Upload className="h-8 w-8 text-gray-400 group-hover:text-[#bd9143] transition-colors" />
                            </div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-center">
                                {uploading ? 'Processing...' : 'Upload Featured Image'}
                            </span>
                            <p className="text-[10px] text-gray-400 mt-2 text-center">Recommened: 800x600px</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={uploading} />
                    </label>
                  )}
                </div>

                <div className="p-4 bg-[#bd9143]/5 rounded-xl border border-[#bd9143]/10">
                    <h5 className="text-[10px] font-black text-[#bd9143] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <CheckCircle2 size={12} /> Pro Tip
                    </h5>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                        Use high-quality imagery to represent this coverage area. This image appears at the top of the details page.
                    </p>
                </div>

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl transition-all shadow-xl active:scale-95 disabled:opacity-50 ${
                    saving || uploading ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'
                  }`}
                >
                  {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">Update Content</span>
                </button>
              </div>
            </div>
          </div>
      </form>
    </div>
  );
};

export default CoverageManagement;

