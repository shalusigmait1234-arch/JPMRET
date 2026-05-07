import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetPrintMediaListQuery,
  useCreatePrintMediaMutation,
  useUpdatePrintMediaMutation,
  useDeletePrintMediaMutation,
  useUploadImageMutation
} from '../../../store/api/adminApi';
import { API_BASE_URL } from '../../../config';
import Pagination from '../../../components/Pagination';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  FileText,
  Upload,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Search
} from 'lucide-react';

const PrintMediaManagement = () => {
  const { data: mediaList, isLoading: fetching } = useGetPrintMediaListQuery();
  const [createMedia, { isLoading: creating }] = useCreatePrintMediaMutation();
  const [updateMedia, { isLoading: updating }] = useUpdatePrintMediaMutation();
  const [deleteMedia, { isLoading: deleting }] = useDeletePrintMediaMutation();
  const [uploadFile, { isLoading: uploading }] = useUploadImageMutation();
  const [searchQuery, setSearchQuery] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    order: 0
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const resetForm = () => {
    setFormData({ title: '', url: '', order: 0 });
    setEditId(null);
    setIsFormOpen(false);

  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      url: item.url,
      order: item.order || 0
    });
    setEditId(item._id);
    setIsFormOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Robust PDF validation: check mime type OR file extension
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      toast.error('Please upload a PDF file only.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('folder', 'print-media');
    uploadData.append('image', file);

    try {
      const response = await uploadFile(uploadData).unwrap();
      setFormData(prev => ({ ...prev, url: response.url }));
      toast.success('File uploaded successfully.');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(err?.data?.message || 'Failed to upload file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateMedia({ id: editId, ...formData }).unwrap();
        toast.success('Publication updated successfully.');
      } else {
        await createMedia(formData).unwrap();
        toast.success('Publication created successfully.');
      }
      setTimeout(resetForm, 1500);
    } catch (err) {
      toast.error('Failed to save publication.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await deleteMedia(id).unwrap();
        toast.success('Publication deleted successfully.');
      } catch (err) {
        toast.error('Failed to delete publication.');
      }
    }
  };

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  // Filter based on search
  const filteredMedia = mediaList?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
              Print Media Management
            </h3>
            <p className="text-sm text-black transition-colors font-black uppercase tracking-widest bg-white border border-gray-100 px-2 py-1 rounded-md shadow-sm ml-2 inline-block">
              Manage your publications and PDF resources
            </p>
          </div>
          <span className="bg-[#001e38] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            Total: {mediaList?.length || 0}
          </span>
        </div>
        {!isFormOpen && (
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-black" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest placeholder:text-black/40 focus:outline-none focus:border-[#bd9143] transition-all min-w-[250px] shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              <Plus size={16} />
              <span>Add Publication</span>
            </button>
          </div>
        )}
      </div>

      {fetching && (
        <div className="p-20 text-center">
          <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
          <p className="mt-4 text-gray-500 text-sm font-bold uppercase tracking-widest">Loading Media...</p>
        </div>
      )}

      {!fetching && isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h4 className="text-xs font-black text-[#013b6d] uppercase tracking-[0.2em] flex items-center gap-2">
                <BookOpen size={14} /> {editId ? 'Edit Publication' : 'Add New Publication'}
              </h4>
              <button onClick={resetForm} className="text-black hover:text-red-600 transition-colors bg-white rounded-full p-2 shadow-sm">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Publication Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                      placeholder="e.g. Organization Profile"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">PDF File</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.url}
                        readOnly
                        className="flex-1 p-2.5 bg-gray-100 border border-gray-100 rounded-lg text-sm font-medium text-gray-500"
                        placeholder="No file uploaded"
                        required
                      />
                      {formData.url && (
                        <a
                          href={getFullUrl(formData.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest shrink-0"
                          title="View Current PDF"
                        >
                          <ExternalLink size={14} />
                          <span>View</span>
                        </a>
                      )}
                      <label className="px-4 py-2.5 bg-[#bd9143] text-white rounded-lg cursor-pointer hover:bg-[#a67d35] transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest shrink-0">
                        {uploading ? <RefreshCw className="animate-spin" size={14} /> : <Upload size={14} />}
                        <span>{formData.url ? 'Change' : 'Upload PDF'}</span>
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={uploading} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all font-bold text-[10px] uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating || updating || uploading}
                    className={`flex items-center space-x-2 px-8 py-2 rounded-lg hover: transition-all font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-50 ${creating || updating || uploading ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'}`}
                  >
                    {creating || updating ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
                    <span>{creating || updating || uploading ? 'Submitting...' : editId ? 'Update Publication' : 'Save Publication'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {!fetching && mediaList && mediaList.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                <div className="p-8 text-center">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-4 bg-[#E33E43]/10 text-[#E33E43] rounded-2xl mx-auto">
                      <FileText size={40} />
                    </div>
                  </div>

                  <h5 className="text-xl font-bold text-[#013b6d] mb-6 line-clamp-1">{item.title}</h5>

                  <div className="flex flex-col gap-3">
                    <a
                      href={getFullUrl(item.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#E33E43] text-white rounded-full hover:bg-[#c12e32] transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                    >
                      <ExternalLink size={14} />
                      <span>View PDF</span>
                    </a>

                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredMedia.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {!fetching && (!mediaList || mediaList.length === 0) && !isFormOpen && (
        <div className="py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-100">
          <BookOpen className="mx-auto h-12 w-12 text-gray-200 mb-4" />
          <h3 className="text-lg font-bold text-[#013b6d] mb-1">No publications found</h3>
          <p className="text-sm text-black font-medium">Add PDFs like profiles, policies, or media clippings.</p>
        </div>
      )}
    </div>
  );
};

export default PrintMediaManagement;

