import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetBenefitsListQuery,
  useCreateBenefitMutation,
  useUpdateBenefitMutation,
  useDeleteBenefitMutation
} from '../../../store/api/adminApi';
import Pagination from '../../../components/Pagination';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Type,
  FileText,
  Heart,
  ArrowUpDown,
  Edit2,
  X
} from 'lucide-react';

const BenefitManagement = () => {
  const { data: benefits, isLoading } = useGetBenefitsListQuery();
  const [createBenefit, { isLoading: creating }] = useCreateBenefitMutation();
  const [updateBenefit, { isLoading: updating }] = useUpdateBenefitMutation();
  const [deleteBenefit] = useDeleteBenefitMutation();

  const [formData, setFormData] = useState({
    title: '',
    icon: 'fa fa-check',
    description: '',
    order: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const resetForm = () => {
    setFormData({ title: '', icon: 'fa fa-check', description: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (benefit) => {
    setFormData({
      title: benefit.title,
      icon: benefit.icon || 'fa fa-check',
      description: benefit.description,
      order: benefit.order || 0
    });
    setEditingId(benefit._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      try {
        await deleteBenefit(id).unwrap();
        toast.success('Benefit deleted successfully!');
        if (editingId === id) resetForm();
      } catch {
        toast.error('Failed to delete benefit.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await updateBenefit({ id: editingId, ...formData }).unwrap();
        toast.success('Benefit updated successfully!');
      } else {
        await createBenefit(formData).unwrap();
        toast.success('Benefit created successfully!');
        resetForm();
      }
    } catch {
      toast.error('Failed to save benefit.');
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  const saving = creating || updating;

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = benefits?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all text-xs font-bold uppercase tracking-widest shadow-md active:scale-95"
        >
          <Plus size={16} />
          <span>Create New Benefit</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-black text-[#013b6d] uppercase tracking-widest">
                {editingId ? 'Edit Benefit' : 'Create New Benefit'}
              </h3>
              <button 
                onClick={() => { resetForm(); setIsModalOpen(false); }} 
                className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm  text-gray-900 uppercase tracking-widest">Title</label>
                </div>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. Agriculture development"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm  text-gray-900 uppercase tracking-widest">Icon Class</label>
                </div>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. fa fa-leaf"
                  required
                />
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">FontAwesome class name</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm  text-gray-900 uppercase tracking-widest">Description</label>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all resize-none"
                placeholder="Enter description"
                required
              />
            </div>

            <div className="space-y-2 w-full md:w-1/2 md:pr-3">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm  text-gray-900 uppercase tracking-widest">Display Order</label>
              </div>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                placeholder="0"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`min-w-[200px] flex items-center justify-center space-x-3 py-2.5 px-6 rounded-lg hover: transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${saving ? 'bg-black text-white' : 'bg-[#001e38] text-white hover:bg-[#bd9143]'}`}
              >
                <Save size={18} />
                <span className="text-sm uppercase tracking-widest">
                  {saving ? 'Submitting...' : editingId ? 'Update' : 'Create'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Existing Benefits</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Icon</th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Content</th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Order</th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {benefits && benefits.length > 0 ? (
                  <>
                    {currentItems.map((benefit) => (
                      <tr key={benefit._id} className={`group hover:bg-gray-50/50 transition-all ${editingId === benefit._id ? 'bg-[#bd9143]/5' : ''}`}>
                        <td className="py-4 px-6">
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-[#bd9143]">
                            <i className={benefit.icon}></i>
                          </div>
                        </td>
                        <td className="py-4 px-6 min-w-[200px]">
                          <h5 className="text-base  text-[#001e38]">{benefit.title}</h5>
                          <p className="text-[13px] text-gray-500 line-clamp-1 mt-1">{benefit.description}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{benefit.order}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(benefit)}
                              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest transition-all ${editingId === benefit._id ? 'bg-[#bd9143] text-white' : 'bg-gray-100 text-[#013b6d] hover:bg-[#013b6d] hover:text-white'}`}
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(benefit._id)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
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
                    <td colSpan="4" className="py-20 text-center text-xs text-gray-400 uppercase tracking-widest">
                      No benefits found. Add one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-50">
            <Pagination 
              currentPage={currentPage}
              totalItems={benefits?.length || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
    </div>
  );
};

export default BenefitManagement;
