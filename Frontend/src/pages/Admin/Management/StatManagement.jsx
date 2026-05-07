import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetStatsListQuery,
  useSaveStatMutation,
  useDeleteStatMutation
} from '../../../store/api/adminApi';
import Pagination from '../../../components/Pagination';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Hash,
  Type,
  ArrowUpDown,
  Pencil,
  X
} from 'lucide-react';

const StatManagement = () => {
  const { data: stats, isLoading } = useGetStatsListQuery();
  const [saveStat, { isLoading: saving }] = useSaveStatMutation();
  const [deleteStat] = useDeleteStatMutation();

  const [formData, setFormData] = useState({
    label: '',
    value: '',
    target: '+',
    order: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const resetForm = () => {
    setFormData({ label: '', value: '', target: '+', order: 0 });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (stat) => {
    setFormData({
      label: stat.label,
      value: stat.value,
      target: stat.target || '+',
      order: stat.order || 0
    });
    setEditingId(stat._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await deleteStat(id).unwrap();
        toast.success('Stat deleted successfully!');
        if (editingId === id) resetForm();
      } catch {
        toast.error('Failed to delete stat.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await saveStat({ id: editingId || undefined, ...formData }).unwrap();
      toast.success(editingId ? 'Stat updated!' : 'Stat created!');
      if (!editingId) resetForm();
    } catch {
      toast.error('Failed to save stat.');
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stats?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
              Stat Management
            </h3>
            <p className="text-sm text-black font-medium uppercase tracking-widest">
              Manage website impact numbers and statistics
            </p>
          </div>
          <span className="bg-[#001e38] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            Total: {stats?.length || 0}
          </span>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all text-xs font-bold uppercase tracking-widest shadow-md"
        >
          <Plus size={14} />
          <span>Create New Stat</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-black text-[#013b6d] uppercase tracking-widest">
                {editingId ? 'Edit Stat' : 'Create New Stat'}
              </h3>
              <button 
                onClick={() => { resetForm(); setIsModalOpen(false); }} 
                className="text-black hover:text-red-600 transition-colors bg-white rounded-full p-1 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Type size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm uppercase tracking-widest">Label</label>
                </div>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. Projects completed"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <ArrowUpDown size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm uppercase tracking-widest">Display Order</label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Hash size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm uppercase tracking-widest">Value</label>
                </div>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. 300"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Type size={14} className="text-[#bd9143]" /> */}
                  <label className="text-sm uppercase tracking-widest">Suffix</label>
                </div>
                <input
                  type="text"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. +"
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
                  {saving ? 'Submitting...' : editingId ? 'Update Stat' : 'Create Stat'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      )}
      

      {/* Existing Stats Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Existing Stats</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-4 px-4 text-xs uppercase tracking-widest">Order</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest">Value</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest">Label</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest">Date Added</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats && stats.length > 0 ? (
                <>
                  {currentItems.map((stat) => (
                    <tr key={stat._id} className={`group hover:bg-gray-50/50 transition-all ${editingId === stat._id ? 'bg-[#bd9143]/5' : ''}`}>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{stat.order}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xl">{stat.value}<span className="text-sm text-[#bd9143]">{stat.target}</span></span>
                      </td>
                      <td className="py-4 px-4 text-base">{stat.label}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs">{stat.createdAt ? new Date(stat.createdAt).toLocaleDateString() : '—'}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(stat)}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${editingId === stat._id ? 'bg-[#bd9143] text-white' : 'bg-gray-100 text-[#013b6d] hover:bg-[#013b6d] hover:text-white'}`}
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(stat._id)}
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
                  <td colSpan="5" className="py-20 text-center text-xs font-black text-black uppercase tracking-widest">
                    No stats found. Add one above.
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
            totalItems={stats?.length || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default StatManagement;
