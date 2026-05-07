import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetServicesListQuery,
  useSaveServiceMutation,
  useDeleteServiceMutation,
  useUploadImageMutation
} from '../../../store/api/adminApi';
import Pagination from '../../../components/Pagination';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Image as ImageIcon,
  Type,
  FileText,
  Link2,
  ArrowUpDown,
  Pencil,
  X,
  Search
} from 'lucide-react';
import { API_BASE_URL } from '../../../config';

const ServiceManagement = () => {
  const { data: services, isLoading } = useGetServicesListQuery();
  const [saveService, { isLoading: saving }] = useSaveServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    order: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `${API_BASE_URL}${imagePath}`;
    return `${API_BASE_URL}/uploads/${imagePath}`;
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', image: '', link: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
      link: service.link,
      order: service.order || 0
    });
    setEditingId(service._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id).unwrap();
        toast.success('Service deleted successfully!');
        if (editingId === id) resetForm();
      } catch {
        toast.error('Failed to delete service.');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const res = await uploadImage(uploadFormData).unwrap();
      setFormData({ ...formData, image: res.url });
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await saveService({ id: editingId || undefined, ...formData }).unwrap();
      toast.success(editingId ? 'Service updated!' : 'Service created!');
      if (!editingId) resetForm();
    } catch {
      toast.error('Failed to save service.');
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  // Filter based on search
  const filteredServices = services?.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
              Service Management
            </h3>
            <p className="text-xs text-black font-black uppercase tracking-widest shadow-sm bg-white border border-gray-100 px-2 py-1 rounded-md inline-block font-bold">
              Manage your core trust services and programs
            </p>
          </div>
          <span className="bg-[#001e38] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            Total: {services?.length || 0}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-black" size={16} />
            </div>
            <input
              type="text"
              placeholder="Search services..."
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
            <span>Create New Service</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-black text-[#013b6d] uppercase tracking-widest">
                {editingId ? 'Edit Service' : 'Create New Service'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Type size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm uppercase tracking-widest">Title</label>
                </div>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Link2 size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm uppercase tracking-widest">Read More Link</label>
                </div>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="Enter URL (e.g., /services/details)"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                {/* <FileText size={14} className="text-[#bd9143]" /> */}
                <label className="text-sm uppercase tracking-widest">Description</label>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all h-20"
                placeholder="Enter service description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <ImageIcon size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Image</label>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {formData.image ? (
                      <img src={getImageUrl(formData.image)} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-300" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-all text-xs font-black uppercase tracking-widest shadow-sm font-bold"
                    >
                      {uploading ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />}
                      <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <ArrowUpDown size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Display Order</label>
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`min-w-[200px] flex items-center justify-center space-x-3 py-2.5 px-6 rounded-lg hover: transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${saving ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'}`}
              >
                <Save size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">
                  {saving ? 'Submitting...' : editingId ? 'Update Service' : 'Create Service'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      )}

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Active Services</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-4 px-6 text-xs  uppercase tracking-widest">Preview</th>
                  <th className="py-4 px-6 text-xs  uppercase tracking-widest">Content</th>
                  <th className="py-4 px-6 text-xs  uppercase tracking-widest">Order</th>
                  <th className="py-4 px-6 text-xs  uppercase tracking-widest">Date Added</th>
                  <th className="py-4 px-6 text-xs  uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services && services.length > 0 ? (
                  <>
                    {currentItems.map((service) => (
                      <tr key={service._id} className="group hover:bg-gray-50/50 transition-all">
                        <td className="py-4 px-6">
                          <img src={getImageUrl(service.image)} className="h-12 w-12 rounded-lg object-cover shadow-sm" alt="" />
                        </td>
                        <td className="py-4 px-6 min-w-[200px]">
                          <h5 className="text-base font-bold text-[#001e38]">{service.title}</h5>
                          <p className="text-[13px] text-black line-clamp-1 mt-1 font-medium">{service.description}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-bold text-black bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">{service.order}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-gray-400 font-medium">{service.createdAt ? new Date(service.createdAt).toLocaleDateString() : '—'}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(service)}
                              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${editingId === service._id ? 'bg-[#bd9143] text-white' : 'bg-gray-100 text-[#013b6d] hover:bg-[#013b6d] hover:text-white'}`}
                            >
                              <Pencil size={12} />
                              {/* <span>Edit</span> */}
                            </button>
                            <button
                              onClick={() => handleDelete(service._id)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                            >
                              <Trash2 size={12} />
                              {/* <span>Delete</span> */}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                      No services found. Add one above.
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
              totalItems={filteredServices.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
    </div>
  );
};

export default ServiceManagement;
