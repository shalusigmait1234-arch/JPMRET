import React, { useState } from 'react';
import {
  useGetStatsListQuery,
  useSaveStatMutation,
  useDeleteStatMutation
} from '../../../store/api/adminApi';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Hash,
  Type,
  ArrowUpDown,
  Edit2
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
  const [message, setMessage] = useState({ type: '', text: '' });

  const resetForm = () => {
    setFormData({ label: '', value: '', target: '+', order: 0 });
    setEditingId(null);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (stat) => {
    setFormData({
      label: stat.label,
      value: stat.value,
      target: stat.target || '+',
      order: stat.order || 0
    });
    setEditingId(stat._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await deleteStat(id).unwrap();
        setMessage({ type: 'success', text: 'Stat deleted successfully!' });
        if (editingId === id) resetForm();
      } catch {
        setMessage({ type: 'error', text: 'Failed to delete stat.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await saveStat({ id: editingId || undefined, ...formData }).unwrap();
      setMessage({ type: 'success', text: editingId ? 'Stat updated!' : 'Stat created!' });
      if (!editingId) resetForm();
    } catch {
      setMessage({ type: 'error', text: 'Failed to save stat.' });
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end">
        {/* <div>
          <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
            Stats / Counter Management
          </h3>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
            Manage the achievement counters on the homepage
          </p>
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
        <div className={`p-4 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Type size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Label</label>
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
                  <ArrowUpDown size={14} className="text-[#bd9143]" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Hash size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Value</label>
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
                  <Type size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Suffix</label>
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
                className="min-w-[200px] flex items-center justify-center space-x-3 py-2.5 px-6 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
              >
                <Save size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">
                  {saving ? 'Saving...' : editingId ? 'Update Stat' : 'Create Stat'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Homepage Preview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(stats && stats.length > 0 ? stats : [
                { label: "Projects completed", value: "300", target: "+" },
                { label: "Communities supported", value: "250", target: "+" },
                { label: "Volunteers engaged", value: "550", target: "+" },
                { label: "Beneficiaries reached", value: "500", target: "+" }
              ]).map((stat, i) => (
                <div key={i} className="bg-[#001e38] rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#bd9143]">
                    {stat.value}<span className="text-lg">{stat.target}</span>
                  </p>
                  <p className="text-xs text-white/70 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Existing Stats Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Existing Stats</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order</th>
                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Value</th>
                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Label</th>
                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date Added</th>
                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats && stats.length > 0 ? (
                stats.map((stat) => (
                  <tr key={stat._id} className={`group hover:bg-gray-50/50 transition-all ${editingId === stat._id ? 'bg-[#bd9143]/5' : ''}`}>
                    <td className="py-4 px-4">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{stat.order}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xl font-bold text-[#013b6d]">{stat.value}<span className="text-sm text-[#bd9143]">{stat.target}</span></span>
                    </td>
                    <td className="py-4 px-4 text-base text-gray-600 font-medium">{stat.label}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs text-gray-400 font-medium">{stat.createdAt ? new Date(stat.createdAt).toLocaleDateString() : '—'}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(stat)}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${editingId === stat._id ? 'bg-[#bd9143] text-white' : 'bg-gray-100 text-[#013b6d] hover:bg-[#013b6d] hover:text-white'}`}
                        >
                          <Edit2 size={12} />
                          {/* <span>Edit</span> */}
                        </button>
                        <button
                          onClick={() => handleDelete(stat._id)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
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
                  <td colSpan="5" className="py-20 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No stats found. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatManagement;
